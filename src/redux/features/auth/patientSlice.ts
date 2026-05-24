import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type PatientState = {
  selectedPatientId: string | null;
};

const initialState: PatientState = {
  selectedPatientId: null,
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setSelectedPatient: (state, action: PayloadAction<string | null>) => {
      state.selectedPatientId = action.payload;
    },
    clearSelectedPatient: (state) => {
      state.selectedPatientId = null;
    },
  },
});

export const {setSelectedPatient, clearSelectedPatient} = patientSlice.actions;

export default patientSlice.reducer;
