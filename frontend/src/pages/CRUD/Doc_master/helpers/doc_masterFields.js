
const doc_masterFields = {
	id: { type: 'id', label: 'ID' },

    doc_name: { type: 'string', label: '서류명',

    options: [

    { value: 'value', label: 'value' },

]

    },

    doc_class_cd: { type: 'string', label: '문서분류코드',

    options: [

    { value: 'value', label: 'value' },

]

    },

    doc_subclass_cd: { type: 'string', label: '하위분류코드',

    options: [

    { value: 'value', label: 'value' },

]

    },

    doc_class_name: { type: 'string', label: '문서분류명',

    options: [

    { value: 'value', label: 'value' },

]

    },

    doc_subclass_name: { type: 'string', label: '문서하위분류명',

    options: [

    { value: 'value', label: 'value' },

]

    },

    is_extract: { type: 'boolean', label: '항목추출여부',

    options: [

    { value: 'value', label: 'value' },

]

    },

    doc_name_alias: { type: 'string', label: '유사 서류명',

    options: [

    { value: 'value', label: 'value' },

]

    },

    doc_keyword: { type: 'string', label: '서류내 Keyword',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default doc_masterFields;
