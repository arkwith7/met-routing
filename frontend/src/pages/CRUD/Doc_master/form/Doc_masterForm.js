import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import doc_masterFields from 'pages/CRUD/Doc_master/helpers/doc_masterFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const Doc_masterForm = (props) => {

  const {
  isEditing,
  isProfile,
  findLoading,
  saveLoading,
  record,
  onSubmit,
  onCancel,
  modal
  } = props;

  const iniValues = () => {
  return IniValues(doc_masterFields, record || {});
  }

  const formValidations = () => {
  return FormValidations(doc_masterFields, record || {});
  }

  const handleSubmit = (values) => {
  const { id, ...data } = PreparedValues(doc_masterFields, values || {});
  onSubmit(id, data);
  };

  const title = () => {
  if(isProfile) {
  return 'Edit My Profile';
  }

  return isEditing
  ? 'Edit Doc_master'
  : 'Add Doc_master';
  };

  const renderForm = () => (
  <Widget title={<h4>{title()}</h4>} collapse close>
  <Formik
          onSubmit={handleSubmit}
  initialValues={iniValues()}
  validationSchema={formValidations()}
  >
  {(form) => (
  <form onSubmit={form.handleSubmit}>
    <Grid container spacing={3} direction="column">

      <Grid item>
        <InputFormItem
          name={'doc_name'}
          schema={doc_masterFields}

            autoFocus

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'doc_class_cd'}
          schema={doc_masterFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'doc_subclass_cd'}
          schema={doc_masterFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'doc_class_name'}
          schema={doc_masterFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'doc_subclass_name'}
          schema={doc_masterFields}

        />
      </Grid>

      <Grid item>
        <SwitchFormItem
          name={'is_extract'}
          schema={doc_masterFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'doc_name_alias'}
          schema={doc_masterFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'doc_keyword'}
          schema={doc_masterFields}

        />
      </Grid>

  </Grid>
  <Grid container spacing={3} mt={2}>
    <Grid item>
      <Button
        color="primary"
        variant="contained"
        onClick={form.handleSubmit}
      >
        Save
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={form.handleReset}
      >
        Reset
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
      </form>
      )
      }
    </Formik>
  </Widget>
  );
  if (findLoading) {
  return <Loader />;
  }
  if (isEditing && !record) {
  return <Loader />;
  }
  return renderForm();
  }
  export default Doc_masterForm;
