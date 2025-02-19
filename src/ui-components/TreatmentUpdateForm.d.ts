/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
    price?: number;
    createdAt?: string;
    updatedAt?: string;
};
export declare type TreatmentUpdateFormValidationValues = {
    treatmentName?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TreatmentUpdateFormOverridesProps = {
    TreatmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    treatmentName?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
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
