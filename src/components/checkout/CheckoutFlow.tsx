"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingBag, MapPin, CreditCard, Check, ChevronRight } from 'lucide-react';
import { CartItem, FormData } from '@/redux/types';
import OrderSummary from './OrderSummary';
import Shipping from './Shipping';
import Payment from './Payment';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';

interface CheckoutStep {
  id: number;
  name: string;
  icon: React.ReactNode;
}

interface CheckoutFlowProps{
  items: CartItem[]
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  province: '',
  zipCode: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ items }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [appliedCoupon, setAppliedCoupon] = useState<{discount: number, code: string} | null>(null);

  // Debug: verificar que los items lleguen correctamente
  useEffect(() => {
    console.log('🛒 CheckoutFlow - Items recibidos:', items);
    console.log('🛒 CheckoutFlow - Cantidad de items:', items?.length || 0);
  }, [items]);

  const handleCouponApplied = (discount: number, code: string) => {
    if (discount > 0 && code) {
      setAppliedCoupon({discount, code});
      console.log('🎫 Cupón aplicado:', code, 'Descuento:', discount + '%');
      // Guardar en sessionStorage para marcar como usado después del pago
      sessionStorage.setItem('appliedCoupon', JSON.stringify({discount, code}));
    } else {
      setAppliedCoupon(null);
      console.log('🎫 Cupón removido');
      sessionStorage.removeItem('appliedCoupon');
    }
  };

  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await userService.getProfile();
        setFormData((prev) => ({
          ...prev,
          email: profile.email,
          phone: profile.phone,
          firstName: profile.firstName,
          lastName: profile.lastName,
          address: profile.address,
          city: profile.city,
          province: profile.province,
          zipCode: profile.zipCode,
        }));
      } catch (error) {
        console.error('No se pudo cargar la dirección del usuario.', error);
      }
    };

    loadProfile();
  }, []);

  const steps: CheckoutStep[] = [
    { id: 1, name: 'Resumen', icon: <ShoppingBag size={20} /> },
    { id: 2, name: 'Envío', icon: <MapPin size={20} /> },
    { id: 3, name: 'Pago', icon: <CreditCard size={20} /> },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateShippingStep = () => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'Ingresá tu nombre.';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Ingresá tu apellido.';
    }
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Ingresá un correo válido.';
    }
    if (!phoneRegex.test(formData.phone.trim()) || formData.phone.trim().length < 7) {
      errors.phone = 'Ingresá un teléfono válido.';
    }
    if (!formData.address.trim()) {
      errors.address = 'La dirección es obligatoria.';
    }
    if (!formData.city.trim()) {
      errors.city = 'Ingresá tu ciudad.';
    }
    if (!formData.province.trim()) {
      errors.province = 'Ingresá tu provincia.';
    }
    if (!formData.zipCode.trim()) {
      errors.zipCode = 'Ingresá tu código postal.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 2) {
      if (!validateShippingStep()) {
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/plant2.png')] bg-cover ">
      <div className="flex flex-wrap items-center justify-center gap-4 py-5 px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {currentStep > step.id ? <Check size={24} /> : step.icon}
              </div>
              <span className={`mt-3 text-sm font-medium ${
                currentStep >= step.id ? 'text-green-700' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`hidden sm:block w-32 h-1 mx-6 mb-8 rounded-full transition-all duration-300 ${
                currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <OrderSummary items={items} onCouponApplied={handleCouponApplied} />

        <div className="rounded-3xl shadow-sm border border-green-100 p-6 sm:p-12 bg-white/80">
          {currentStep === 2 && (
            <Shipping data={formData} handleInputChange={handleInputChange} errors={formErrors} />
          )}

          {currentStep === 3 && (
            <Payment
              items={items}
              shippingInfo={formData}
              appliedCoupon={appliedCoupon}
            />
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-4 mt-12">
            {currentStep > 1 && (
              <button
                onClick={handlePrevStep}
                className="cursor-pointer px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-full hover:scale-95 transition-all duration-300"
              >
                Volver
              </button>
            )}
            {currentStep < 3 && (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto cursor-pointer px-8 py-4 bg-green-600 text-white rounded-full hover:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-200"
              >
                Continuar
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
