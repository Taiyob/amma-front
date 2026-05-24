// server function
'use server';

import {FormData} from '@/types/Register.types';

export async function registerUser(formData: FormData) {
  console.log('Received on server:', formData);

  try {
    return {
      success: true,
      message: 'Registration successful!',
      data: formData,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: 'Failed to complete registration',
      error: err,
    };
  }
}
