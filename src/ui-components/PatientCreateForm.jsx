/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createPatient } from "../graphql/mutations";
export default function PatientCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    patientID: "",
    title: "",
    patientName: "",
    mobileNumber: "",
    emailId: "",
    address: "",
    dateOfBirth: "",
    age: "",
    bloodGroup: "",
    gender: "",
    createdAt: "",
    updatedAt: "",
  };
  const [patientID, setPatientID] = React.useState(initialValues.patientID);
  const [title, setTitle] = React.useState(initialValues.title);
  const [patientName, setPatientName] = React.useState(
    initialValues.patientName
  );
  const [mobileNumber, setMobileNumber] = React.useState(
    initialValues.mobileNumber
  );
  const [emailId, setEmailId] = React.useState(initialValues.emailId);
  const [address, setAddress] = React.useState(initialValues.address);
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialValues.dateOfBirth
  );
  const [age, setAge] = React.useState(initialValues.age);
  const [bloodGroup, setBloodGroup] = React.useState(initialValues.bloodGroup);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPatientID(initialValues.patientID);
    setTitle(initialValues.title);
    setPatientName(initialValues.patientName);
    setMobileNumber(initialValues.mobileNumber);
    setEmailId(initialValues.emailId);
    setAddress(initialValues.address);
    setDateOfBirth(initialValues.dateOfBirth);
    setAge(initialValues.age);
    setBloodGroup(initialValues.bloodGroup);
    setGender(initialValues.gender);
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setErrors({});
  };
  const validations = {
    patientID: [{ type: "Required" }],
    title: [],
    patientName: [{ type: "Required" }],
    mobileNumber: [{ type: "Required" }],
    emailId: [],
    address: [],
    dateOfBirth: [],
    age: [],
    bloodGroup: [],
    gender: [],
    createdAt: [],
    updatedAt: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          patientID,
          title,
          patientName,
          mobileNumber,
          emailId,
          address,
          dateOfBirth,
          age,
          bloodGroup,
          gender,
          createdAt,
          updatedAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createPatient.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PatientCreateForm")}
      {...rest}
    >
      <TextField
        label="Patient id"
        isRequired={true}
        isReadOnly={false}
        value={patientID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID: value,
              title,
              patientName,
              mobileNumber,
              emailId,
              address,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.patientID ?? value;
          }
          if (errors.patientID?.hasError) {
            runValidationTasks("patientID", value);
          }
          setPatientID(value);
        }}
        onBlur={() => runValidationTasks("patientID", patientID)}
        errorMessage={errors.patientID?.errorMessage}
        hasError={errors.patientID?.hasError}
        {...getOverrideProps(overrides, "patientID")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title: value,
              patientName,
              mobileNumber,
              emailId,
              address,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Patient name"
        isRequired={true}
        isReadOnly={false}
        value={patientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName: value,
              mobileNumber,
              emailId,
              address,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.patientName ?? value;
          }
          if (errors.patientName?.hasError) {
            runValidationTasks("patientName", value);
          }
          setPatientName(value);
        }}
        onBlur={() => runValidationTasks("patientName", patientName)}
        errorMessage={errors.patientName?.errorMessage}
        hasError={errors.patientName?.hasError}
        {...getOverrideProps(overrides, "patientName")}
      ></TextField>
      <TextField
        label="Mobile number"
        isRequired={true}
        isReadOnly={false}
        value={mobileNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber: value,
              emailId,
              address,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.mobileNumber ?? value;
          }
          if (errors.mobileNumber?.hasError) {
            runValidationTasks("mobileNumber", value);
          }
          setMobileNumber(value);
        }}
        onBlur={() => runValidationTasks("mobileNumber", mobileNumber)}
        errorMessage={errors.mobileNumber?.errorMessage}
        hasError={errors.mobileNumber?.hasError}
        {...getOverrideProps(overrides, "mobileNumber")}
      ></TextField>
      <TextField
        label="Email id"
        isRequired={false}
        isReadOnly={false}
        value={emailId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              emailId: value,
              address,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.emailId ?? value;
          }
          if (errors.emailId?.hasError) {
            runValidationTasks("emailId", value);
          }
          setEmailId(value);
        }}
        onBlur={() => runValidationTasks("emailId", emailId)}
        errorMessage={errors.emailId?.errorMessage}
        hasError={errors.emailId?.hasError}
        {...getOverrideProps(overrides, "emailId")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              emailId,
              address: value,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Date of birth"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              emailId,
              address,
              dateOfBirth: value,
              age,
              bloodGroup,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.dateOfBirth ?? value;
          }
          if (errors.dateOfBirth?.hasError) {
            runValidationTasks("dateOfBirth", value);
          }
          setDateOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dateOfBirth", dateOfBirth)}
        errorMessage={errors.dateOfBirth?.errorMessage}
        hasError={errors.dateOfBirth?.hasError}
        {...getOverrideProps(overrides, "dateOfBirth")}
      ></TextField>
      <TextField
        label="Age"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              emailId,
              address,
              dateOfBirth,
              age: value,
              bloodGroup,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
      ></TextField>
      <TextField
        label="Blood group"
        isRequired={false}
        isReadOnly={false}
        value={bloodGroup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              emailId,
              address,
              dateOfBirth,
              age,
              bloodGroup: value,
              gender,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.bloodGroup ?? value;
          }
          if (errors.bloodGroup?.hasError) {
            runValidationTasks("bloodGroup", value);
          }
          setBloodGroup(value);
        }}
        onBlur={() => runValidationTasks("bloodGroup", bloodGroup)}
        errorMessage={errors.bloodGroup?.errorMessage}
        hasError={errors.bloodGroup?.hasError}
        {...getOverrideProps(overrides, "bloodGroup")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={false}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              emailId,
              address,
              dateOfBirth,
              age,
              bloodGroup,
              gender: value,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              emailId,
              address,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              createdAt: value,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Updated at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={updatedAt && convertToLocal(new Date(updatedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              emailId,
              address,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              createdAt,
              updatedAt: value,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
