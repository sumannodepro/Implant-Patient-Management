/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TreatmentUpdateFormInputValues = {
    treatmentName?: string;
    description?: string;
    price?: number;
    duration?: number;
    createdAt?: string;
    updatedAt?: string;
    doctorID?: string;
    isActive?: boolean;
    category?: string;
    discount?: number;
    insuranceCovered?: boolean;
    notes?: string;
    imageUrl?: string;
};
export declare type TreatmentUpdateFormValidationValues = {
    treatmentName?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    duration?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
    doctorID?: ValidationFunction<string>;
    isActive?: ValidationFunction<boolean>;
    category?: ValidationFunction<string>;
    discount?: ValidationFunction<number>;
    insuranceCovered?: ValidationFunction<boolean>;
    notes?: ValidationFunction<string>;
    imageUrl?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TreatmentUpdateFormOverridesProps = {
    TreatmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    treatmentName?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    duration?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
    doctorID?: PrimitiveOverrideProps<TextFieldProps>;
    isActive?: PrimitiveOverrideProps<SwitchFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    discount?: PrimitiveOverrideProps<TextFieldProps>;
    insuranceCovered?: PrimitiveOverrideProps<SwitchFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TreatmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: TreatmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    treatment?: any;
    onSubmit?: (fields: TreatmentUpdateFormInputValues) => TreatmentUpdateFormInputValues;
    onSuccess?: (fields: TreatmentUpdateFormInputValues) => void;
    onError?: (fields: TreatmentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TreatmentUpdateFormInputValues) => TreatmentUpdateFormInputValues;
    onValidate?: TreatmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TreatmentUpdateForm(props: TreatmentUpdateFormProps): React.ReactElement;
