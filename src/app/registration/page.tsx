'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EffectsInitializer from "../components/EffectsInitializer";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { supabase } from "@/lib/client";
import "../styles/base.css";
import "../styles/register.css";

export default function RegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    skills: '',
    motivation: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase
        .from('workshop_registrations')
        .insert([{ 
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          institution: formData.institution,
          skills: formData.skills,
          motivation: formData.motivation,
          created_at: new Date().toISOString()
        }]);
      if (supabaseError) throw supabaseError;
      router.push('/registration/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : JSON.stringify(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-36 pb-24 px-4 bg-black">
      <EffectsInitializer />
      <section id="register" className="max-w-5xl mx-auto">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-6xl font-bold text-white tracking-tight [text-shadow:_0_4px_12px_rgb(255_255_255_/_20%)]">
              Join The Mission
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed [text-shadow:_0_2px_8px_rgb(255_255_255_/_15%)] typing-content">
              Ready to contribute to space exploration and Earth science? Register
              now for NASA Space Apps Challenge 2025 Lucknow Edition. Limited
              spots available.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="text-red-500 p-4">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-group relative">
                <Input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder=""
                  className="block w-full h-12 px-0 bg-transparent border-0 border-b border-gray-700 text-white focus:outline-none focus:ring-0 focus:border-gray-500 transition-all peer placeholder-transparent text-lg rounded-none"
                  style={{ caretColor: 'white' }}
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-0 top-3.5 text-gray-300 text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gray-400 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400 [text-shadow:_0_2px_8px_rgb(255_255_255_/_15%)]"
                >
                  First Name
                </label>
              </div>
              <div className="form-group relative">
                <Input
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder=""
                  className="block w-full h-12 px-0 bg-transparent border-0 border-b border-gray-700 text-white focus:outline-none focus:ring-0 focus:border-gray-500 transition-all peer placeholder-transparent text-lg rounded-none"
                  style={{ caretColor: 'white' }}
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-0 top-3.5 text-gray-300 text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gray-400 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400 [text-shadow:_0_2px_8px_rgb(255_255_255_/_15%)]"
                >
                  Last Name
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-group relative">
                <Input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=""
                  className="block w-full h-12 px-0 bg-transparent border-0 border-b border-gray-700 text-white focus:outline-none focus:ring-0 focus:border-gray-500 transition-all peer placeholder-transparent text-lg rounded-none"
                  style={{ caretColor: 'white' }}
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3.5 text-gray-300 text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gray-400 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400 [text-shadow:_0_2px_8px_rgb(255_255_255_/_15%)]"
                >
                  Email Address
                </label>
              </div>
              <div className="form-group relative">
                <Input
                  type="text"
                  id="institution"
                  required
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder=""
                  className="block w-full h-12 px-0 bg-transparent border-0 border-b border-gray-700 text-white focus:outline-none focus:ring-0 focus:border-gray-500 transition-all peer placeholder-transparent text-lg rounded-none"
                  style={{ caretColor: 'white' }}
                />
                <label
                  htmlFor="institution"
                  className="absolute left-0 top-3.5 text-gray-300 text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gray-400 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400 [text-shadow:_0_2px_8px_rgb(255_255_255_/_15%)]"
                >
                  Institution
                </label>
              </div>
            </div>
            <div className="form-group relative">
              <Input
                type="text"
                id="skills"
                required
                value={formData.skills}
                onChange={handleInputChange}
                placeholder=""
                className="block w-full h-12 px-0 bg-transparent border-0 border-b border-gray-700 text-white focus:outline-none focus:ring-0 focus:border-gray-500 transition-all peer placeholder-transparent text-lg rounded-none"
                style={{ caretColor: 'white' }}
              />
              <label
                htmlFor="skills"
                className="absolute left-0 top-3.5 text-gray-300 text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gray-400 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400 [text-shadow:_0_2px_8px_rgb(255_255_255_/_15%)]"
              >
                Skills & Background
              </label>
            </div>
            <div className="form-group relative">
              <Textarea
                id="motivation"
                required
                value={formData.motivation}
                onChange={handleInputChange}
                rows={3}
                placeholder=""
                className="block w-full px-0 bg-transparent border-0 border-b border-gray-700 text-white focus:outline-none focus:ring-0 focus:border-gray-500 transition-all peer placeholder-transparent resize-none text-lg rounded-none"
                style={{ caretColor: 'white' }}
              />
              <label
                htmlFor="motivation"
                className="absolute left-0 top-3.5 text-gray-300 text-base transition-all duration-300 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gray-400 peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-400 [text-shadow:_0_2px_8px_rgb(255_255_255_/_15%)]"
              >
                Why do you want to participate in NASA Space Apps Challenge?
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-6 mt-6 text-lg text-white bg-black border border-white relative overflow-hidden group transition-colors duration-700 disabled:opacity-50 disabled:cursor-not-allowed hover:text-black rounded-none"
              style={{
                backgroundImage: 'linear-gradient(to right, white 50%, black 50%)',
                backgroundSize: '200% 100%',
                backgroundPosition: '100%',
                transition: 'all 0.7s ease-in-out'
              }}
              onMouseEnter={e => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundPosition = '0%';
              }}
              onMouseLeave={e => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundPosition = '100%';
              }}
            >
              {isSubmitting ? 'Registering...' : 'Register Now'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
