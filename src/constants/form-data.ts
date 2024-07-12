import { Patient } from "@/types/backend";
import { PatientType } from "@/types/index";

export const defaultPatientGeneralInformation = {
  patientId: "",
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  nationalId: "",
  phoneNumber: "",
  email: "",
  location: "",
  district: "",
  maritalStatus: "",
  profilePicture: null,
};

export const defaultPatientAdditionalInformation = {
  allergies: "",
  knownConditions: "",
  primaryCarePhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
};

export const defaultPatientEmergencyContact = {
  emergencyContactNameOne: "",
  emergencyContactPhoneNumberOne: "",
  emergencyContactAddressOne: "",
  emergencyContactRelationshipOne: "",
  emergencyContactNameTwo: "",
  emergencyContactPhoneNumberTwo: "",
  emergencyContactAddressTwo: "",
  emergencyContactRelationshipTwo: "",
};

export const defaultEmergencyContact = {
  name: "Whitney Rolfson",
  relationship: "Sister",
  address: "08870 Wuckert Port",
  contact: "614-404-0582",
};

export const defaultPatient: Patient = {
  _id: "",
  firstName: "",
  lastName: "",
  gender: "",
  maritalStatus: "",
  nationalId: "",
  contact: "",
  email: "",
  location: "",
  district: "",
  profilePictureUrl: "",
  additional: null,
  chpsCompoundId: "",
  createdAt: "",
  updatedAt: "",
  patientId: "",
  __v: 0,
  emergencyContacts: [defaultEmergencyContact],
};

export const formatPatientInfo = (patient: Patient) => {
  const formatted: PatientType = {
    general: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      nationalId: patient.nationalId,
      contact: patient.contact,
      email: patient.email,
      location: patient.location,
      district: patient.district,
      maritalStatus: patient.maritalStatus,
    },
    additional: {
      allergies: patient.additional
        ? patient.additional.allergies.length > 0
          ? patient.additional.allergies.join(",")
          : ""
        : "",
      knownCondition: patient.additional
        ? patient.additional.knownCondition
        : "",
      primaryPhysician: patient.additional
        ? patient.additional.primaryPhysician
        : "",
      insuranceProvider: patient.additional
        ? patient.additional.insuranceProvider
        : "",
      insurancePolicyNumber: patient.additional
        ? patient.additional.insurancePolicyNumber
        : "",
    },
    emergency: {
      emergencyContactNameOne: patient.emergencyContacts[0].name,
      emergencyContactPhoneNumberOne: patient.emergencyContacts[0].contact,
      emergencyContactAddressOne: patient.emergencyContacts[0].address,
      emergencyContactRelationshipOne:
        patient.emergencyContacts[0].relationship,
      emergencyContactNameTwo:
        patient.emergencyContacts.length > 1
          ? patient.emergencyContacts[1].name
          : "",
      emergencyContactPhoneNumberTwo:
        patient.emergencyContacts.length > 1
          ? patient.emergencyContacts[1].contact
          : "",
      emergencyContactAddressTwo:
        patient.emergencyContacts.length > 1
          ? patient.emergencyContacts[1].address
          : "",
      emergencyContactRelationshipTwo:
        patient.emergencyContacts.length > 1
          ? patient.emergencyContacts[1].relationship
          : "",
    },
  };

  return formatted;
};