import { useState, SyntheticEvent } from 'react';
import { toast } from 'sonner';
import { FormResponse } from '../types/forms';

/**
 * Common configuration for form submission handler.
 */
interface FormSubmissionOptions<T> {
  apiCall: (data: T) => Promise<FormResponse<T>>;
  requiredFields?: (keyof T)[];
  successMessage?: string;
  errorMessage?: string;
}

/**
 * A reusable hook for handling form state and submissions with TypeScript.
 */
export const useForm = <T extends Record<string, any>>(onSuccess?: (data: T) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Basic validation for email format.
   */
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  };

  /**
   * Generic submission logic for React forms.
   */
  const handleSubmission = async (
    e: SyntheticEvent<HTMLFormElement>, 
    options: FormSubmissionOptions<T>
  ) => {
    const { apiCall, requiredFields = [], successMessage = 'Submitted successfully!', errorMessage = 'Submission failed' } = options;
    
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries()) as any;

      // 1. Validation: Required Fields
      for (const field of requiredFields) {
        const fieldKey = field as string;
        const val = data[fieldKey];
        if (val === undefined || (typeof val === 'string' && val.trim() === '')) {
          const fieldLabel = fieldKey.replace(/_/g, ' ');
          const errorMsg = `The field "${fieldLabel}" is required.`;
          setError(errorMsg);
          toast.error(errorMsg);
          setLoading(false);
          return;
        }
      }

      // 2. Validation: Email (if 'email' key exists in data)
      if (data.email && typeof data.email === 'string' && !isValidEmail(data.email)) {
        const errorMsg = 'Please enter a valid email address.';
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      // 3. API Call
      const response = await apiCall(data as T);

      if (response.success) {
        setSuccess(true);
        toast.success(successMessage);
        form.reset(); // Reset form on success
        if (onSuccess) onSuccess(response.data as T);
      } else {
        // Handle specific Supabase error codes for better UX
        const apiError = response.error || errorMessage;
        setError(apiError);
        toast.error(apiError);
      }
    } catch (err: any) {
      console.error('Form execution error:', err);
      const catchError = 'An unexpected error occurred. Please try again.';
      setError(catchError);
      toast.error(catchError);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    setLoading,
    setError,
    setSuccess,
    handleSubmission
  };
};
