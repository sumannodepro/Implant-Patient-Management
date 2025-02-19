/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient(
    $filter: ModelSubscriptionPatientFilterInput
    $owner: String
  ) {
    onCreatePatient(filter: $filter, owner: $owner) {
      id
      patientID
      title
      patientName
      mobileNumber
      emailId
      address
      dateOfBirth
      age
      bloodGroup
      gender
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient(
    $filter: ModelSubscriptionPatientFilterInput
    $owner: String
  ) {
    onUpdatePatient(filter: $filter, owner: $owner) {
      id
      patientID
      title
      patientName
      mobileNumber
      emailId
      address
      dateOfBirth
      age
      bloodGroup
      gender
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient(
    $filter: ModelSubscriptionPatientFilterInput
    $owner: String
  ) {
    onDeletePatient(filter: $filter, owner: $owner) {
      id
      patientID
      title
      patientName
      mobileNumber
      emailId
      address
      dateOfBirth
      age
      bloodGroup
      gender
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateTreatment = /* GraphQL */ `
  subscription OnCreateTreatment(
    $filter: ModelSubscriptionTreatmentFilterInput
    $owner: String
  ) {
    onCreateTreatment(filter: $filter, owner: $owner) {
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
export const onUpdateTreatment = /* GraphQL */ `
  subscription OnUpdateTreatment(
    $filter: ModelSubscriptionTreatmentFilterInput
    $owner: String
  ) {
    onUpdateTreatment(filter: $filter, owner: $owner) {
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
export const onDeleteTreatment = /* GraphQL */ `
  subscription OnDeleteTreatment(
    $filter: ModelSubscriptionTreatmentFilterInput
    $owner: String
  ) {
    onDeleteTreatment(filter: $filter, owner: $owner) {
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
