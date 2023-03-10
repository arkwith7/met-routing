
const disease_cdFields = {
	id: { type: 'id', label: 'ID' },

    code: { type: 'string', label: '코드',

    options: [

    { value: 'value', label: 'value' },

]

    },

    code_name: { type: 'string', label: '질병명',

    options: [

    { value: 'value', label: 'value' },

]

    },

    code_name_alias: { type: 'string', label: '유사질병명',

    options: [

    { value: 'value', label: 'value' },

]

    },

    body_part: { type: 'string', label: '신체부위',

    options: [

    { value: 'value', label: 'value' },

]

    },

    left_or_right: { type: 'string', label: '좌우구분',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default disease_cdFields;
