/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
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
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTreatment = /* GraphQL */ `
  query GetTreatment($id: ID!) {
    getTreatment(id: $id) {
      id
      treatmentName
      description
      price
      duration
      createdAt
      updatedAt
      doctorID
      isActive
      category
      discount
      insuranceCovered
      notes
      imageUrl
      owner
      __typename
    }
  }
`;
export const listTreatments = /* GraphQL */ `
  query ListTreatments(
    $filter: ModelTreatmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTreatments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        treatmentName
        description
        price
        duration
        createdAt
        updatedAt
        doctorID
        isActive
        category
        discount
        insuranceCovered
        notes
        imageUrl
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
