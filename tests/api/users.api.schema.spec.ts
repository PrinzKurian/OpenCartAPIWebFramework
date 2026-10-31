import {test, expect} from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';


const TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`};

//setup the AJV:

let ajv =new Ajv();

//define JSON schema:
let userSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};


let userArraysSchema = {
    "type": "array",
    "items": userSchema
};

test('GET -- get a user', async ({ apiHelper }) => {

    let userData = {
        name: "schema test",
        email: `automation_${Date.now()}@open.com`,
        gender: "male",
        status: "active"
        };

    //Post -- create a user
    let createResponse = apiHelper.post('/public/v2/users/', userData, AUTH_HEADER);
    let userId = (await createResponse).body.id;

    //get -- get a user

    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
        expect(getUserResponse.status).toBe(200);
        
        //Schema validation code:

        let validate = ajv.compile(userSchema); //behave like function exp
        let isSchemaValid = validate(getUserResponse.body);
        if(!isSchemaValid) {
            console.log('Shema Errors:', validate.errors);
        }
        expect(isSchemaValid).toBeTruthy();


});

test('GET -- get all user', async ({ apiHelper }) => {

    //get -- get all user

    let getUsersResponse = await apiHelper.get(`/public/v2/users/`, AUTH_HEADER);
        expect(getUsersResponse.status).toBe(200);
        
        //Schema validation code:

        let validate = ajv.compile(userArraysSchema); //behave like function exp
        let isSchemaValid = validate(getUsersResponse.body);
        if(!isSchemaValid) {
            console.log('Shema Errors:', validate.errors);
        }
        expect(isSchemaValid).toBeTruthy();


});





