
const usersFields = {
	id: { type: 'id', label: 'ID' },

    userName: { type: 'string', label: '사용자 ID',

    },

    korName: { type: 'string', label: '성명',

    },

    phoneNumber: { type: 'string', label: '전화번호',

    },

    email: { type: 'string', label: 'E-Mail',

    },

    role: { type: 'enum', label: 'Role',

    options: [

    { value: 'admin', label: 'admin' },

    { value: 'user', label: 'user' },

]

    },

    disabled: { type: 'boolean', label: '비활성',

    },

    avatar: { type: 'images', label: 'Avatar',

    },

    password: { type: 'string', label: '비밀번호',

    },

    emailVerified: { type: 'boolean', label: 'Email Verified',

    },

    emailVerificationToken: { type: 'string', label: 'Email Verification Token',

    },

    emailVerificationTokenExpiresAt: { type: 'datetime', label: 'Email Verification Token Expires At',

    },

    passwordResetToken: { type: 'string', label: 'Password Reset Token',

    },

    passwordResetTokenExpiresAt: { type: 'datetime', label: 'Password Reset Token Expires At',

    },

    provider: { type: 'string', label: 'Provider',

    },

password: { type: 'string', label: '비밀번호' },

}

export default usersFields;
