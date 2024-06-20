const Recruiter = require('../models/recruiter-model')
const recruiterValidationSchema = {
    userId: {
        custom: {
            options: async function(value, { req }){
                const recruiter = await Recruiter.findOne({ userId: req.user.id })
                if(recruiter) {
                    throw new Error('Profile already created')
                } else {
                    return true 
                }
            }
        }
    },
    companyName: {
        in: ['body'],
        exists: {
            errorMessage: 'company name is required'
        },
        notEmpty: {
            errorMessage: 'company name cannot be empty'
        },
        trim: true 
    },
    email: {
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be blank'
        },
        isEmail: {
            errorMessage: 'invalid email format'
        },
        normalizeEmail: true,
        trim: true 
    },
    website:{

    },
    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        notEmpty: {
            errorMessage: 'address cannot be empty'
        },
        trim: true 
    }
}

module.exports = recruiterValidationSchema