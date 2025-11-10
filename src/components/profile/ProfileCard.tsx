import { UserProfile } from "@/redux/types";
import { Edit2, Mail, MapPin, Phone, Save, X, Loader2 } from "lucide-react";
import React from "react";
import Input from "./Input";

interface ProfileCardProps {
    userProfile: UserProfile;
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveProfile: () => void;
    isSaving: boolean;
}

export default function ProfileCard({ userProfile, isEditing, onEdit, onCancel, handleInputChange, handleSaveProfile, isSaving }: ProfileCardProps) {
    const initials = `${userProfile.firstName?.[0] ?? ""}${userProfile.lastName?.[0] ?? ""}`.trim() || "?";

    return (
        <div className="backdrop-blur-sm bg-white/40 rounded-3xl shadow-sm border border-green-100 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl sm:text-2xl font-light shadow-lg">
                        {initials}
                    </div>
                    <div>
                        <h3 className="text-2xl font-light text-gray-800">
                            {userProfile.firstName} {userProfile.lastName}
                        </h3>
                        <p className="text-gray-500">{userProfile.email}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {!isEditing ? (
                        <button
                            onClick={onEdit}
                            className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-green-200"
                        >
                            <Edit2 size={18} />
                            Editar
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                                className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-full hover:scale-95 transition-all duration-300 shadow-lg shadow-green-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                {isSaving ? "Guardando" : "Guardar"}
                            </button>
                            <button
                                onClick={onCancel}
                                disabled={isSaving}
                                className="cursor-pointer flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-full hover:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <X size={18} />
                                Cancelar
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <Input name="firstName" value={userProfile.firstName} isEditing={isEditing} type="text" handleInputChange={handleInputChange} autoComplete="given-name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                    <Input name="lastName" value={userProfile.lastName} isEditing={isEditing} type="text" handleInputChange={handleInputChange} autoComplete="family-name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-2" /> Email
                    </label>
                    <Input name="email" value={userProfile.email} isEditing={isEditing} type="email" handleInputChange={handleInputChange} readOnly autoComplete="email" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-2" /> Teléfono
                    </label>
                    <Input name="phone" value={userProfile.phone} isEditing={isEditing} type="tel" handleInputChange={handleInputChange} autoComplete="tel" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin size={16} className="inline mr-2" /> Dirección
                    </label>
                    <Input name="address" value={userProfile.address} isEditing={isEditing} type="text" handleInputChange={handleInputChange} autoComplete="street-address" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                    <Input name="city" value={userProfile.city} isEditing={isEditing} type="text" handleInputChange={handleInputChange} autoComplete="address-level2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label>
                    <Input name="province" value={userProfile.province} isEditing={isEditing} type="text" handleInputChange={handleInputChange} autoComplete="address-level1" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                    <Input name="zipCode" value={userProfile.zipCode} isEditing={isEditing} type="text" handleInputChange={handleInputChange} autoComplete="postal-code" />
                </div>
            </div>
        </div>
    )
}
