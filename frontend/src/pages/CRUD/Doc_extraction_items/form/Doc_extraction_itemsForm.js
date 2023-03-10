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

import doc_extraction_itemsFields from 'pages/CRUD/Doc_extraction_items/helpers/doc_extraction_itemsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import Doc_masterSelectItem from 'pages/CRUD/Doc_master/helpers/Doc_masterSelectItem';

const Doc_extraction_itemsForm = (props) => {

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
  return IniValues(doc_extraction_itemsFields, record || {});
  }

  const formValidations = () => {
  return FormValidations(doc_extraction_itemsFields, record || {});
  }

  const handleSubmit = (values) => {
  const { id, ...data } = PreparedValues(doc_extraction_itemsFields, values || {});
  onSubmit(id, data);
  };

  const title = () => {
  if(isProfile) {
  return 'My Info. 수정';
  }

  return isEditing
  ? 'Edit Doc_extraction_items'
  : 'Add Doc_extraction_items';
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
        <Doc_masterSelectItem
        name={'doc_name'}
        schema={doc_extraction_itemsFields}
        showCreate={!modal}
        form={form}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'item_no'}
          schema={doc_extraction_itemsFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'item_label'}
          schema={doc_extraction_itemsFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'item_value'}
          schema={doc_extraction_itemsFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'item_type'}
          schema={doc_extraction_itemsFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'item_len'}
          schema={doc_extraction_itemsFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'befor_desc'}
          schema={doc_extraction_itemsFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'after_desc'}
          schema={doc_extraction_itemsFields}

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
  export default Doc_extraction_itemsForm;
