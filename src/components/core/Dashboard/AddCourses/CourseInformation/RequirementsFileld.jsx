
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function RequirementsField  ({ 
  label, 
  name, 
  register, 
  setValue, 
  getValues, 
  errors 
})  {
  const [requirements, setRequirements] = useState(['', '', '']);
  const [inputValue, setInputValue] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Initialize with existing values if any
    const existingValues = getValues(name);
    if (existingValues && existingValues.length > 0) {
      setRequirements(existingValues);
    }
  }, []);

    useEffect(() => {
        // Update form value whenever requirements change
        const filteredReqs = requirements.filter(req => req.trim() !== '');
        setValue(name, filteredReqs, { 
           shouldValidate: hasInteracted,   // This triggers validation
            shouldDirty: true,
            shouldTouch: true      // Mark as touched to show/hide errors
        });
    }, [requirements, name, setValue]);

  const handleAdd = () => {
    if (inputValue.trim()) {
        setHasInteracted(true);
        const newRequirements = [...requirements, inputValue.trim()];
        setRequirements(newRequirements);
        setInputValue('');
    }
  };

  const handleRemove = (index) => {
    setHasInteracted(true); 
    const newRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(newRequirements);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-200 mb-2">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>

      {/* Input field */}
      <div className="mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Add ${label}`}
          className="form-style !bg-richblack-700 w-full transition-colors"
        />
      </div>

      {/* Add button */}
      <button
        type="button"
        onClick={handleAdd}
        className="mb-4 text-yellow-400 font-medium text-sm hover:text-yellow-300 transition-colors"
      >
        Add
      </button>

      {/* List of requirements */}
      {requirements.length > 0 && (
        <div className="space-y-2">
          {requirements.map((req, index) => (
            req.trim() && (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded-lg group hover:bg-gray-650 transition-colors"
              >
                <span className="text-gray-200 text-sm flex-1">{req}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="ml-3 text-gray-400 hover:text-red-400 transition-colors"
                  aria-label="Remove requirement"
                >
                  <X size={18} />
                </button>
              </div>
            )
          ))}
        </div>
      )}

      {/* Error message */}
      {errors?.[name] && (
        <p className="mt-2 text-sm text-pink-400">
          {errors[name].message} 
        </p>
      )}

      {/* Hidden input to register with react-hook-form */}
      <input
        type="hidden"
        {...register(name, {
            required: `${label} is required`,
            validate: (value) => {
            if (!value || value.length === 0) {
                return `Please add at least one ${label.toLowerCase()}`;
            }
            return true;
            }
        })}
      />
    </div>
  );
};
