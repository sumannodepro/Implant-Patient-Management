/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
      id
      patientID
      title
      patientName
      mobileNumber
      landlineNumber
      city
      emailId
      address
      address2
      religion
      dateOfBirth
      age
      bloodGroup
      gender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
      id
      patientID
      title
      patientName
      mobileNumber
      landlineNumber
      city
      emailId
      address
      address2
      religion
      dateOfBirth
      age
      bloodGroup
      gender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
      id
      patientID
      title
      patientName
      mobileNumber
      landlineNumber
      city
      emailId
      address
      address2
      religion
      dateOfBirth
      age
      bloodGroup
      gender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTreatment = /* GraphQL */ `
  mutation CreateTreatment(
    $input: CreateTreatmentInput!
    $condition: ModelTreatmentConditionInput
  ) {
    createTreatment(input: $input, condition: $condition) {
      id
      treatmentName
      price
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateTreatment = /* GraphQL */ `
  mutation UpdateTreatment(
    $input: UpdateTreatmentInput!
    $condition: ModelTreatmentConditionInput
  ) {
    updateTreatment(input: $input, condition: $condition) {
      id
      treatmentName
      price
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteTreatment = /* GraphQL */ `
  mutation DeleteTreatment(
    $input: DeleteTreatmentInput!
    $condition: ModelTreatmentConditionInput
  ) {
    deleteTreatment(input: $input, condition: $condition) {
      id
      treatmentName
      price
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
