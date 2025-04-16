"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  how: z.string({
    required_error: "Veuillez sélectionner comment vous nous avez connu.",
  }),
  why: z.string({
    required_error: "Veuillez sélectionner la raison de votre contact.",
  }),
  language: z.string({
    required_error: "Veuillez sélectionner votre langue préférée.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }

      form.reset();
      alert("Message envoyé avec succès !!");

      // Redirection après 2 secondes
      setTimeout(() => {
        window.location.href = "https://poc.snowledge.eu";
      }, 2000);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de l'envoi du message.");
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Form {...form}>
      <motion.div
        className="flex flex-col items-center min-h-screen py-12 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8"
          variants={itemVariants}
        >
          <div className="text-center">
            <Image
              src="/images/snowledge-logo.png"
              alt="Snowledge Logo"
              width={250}
              height={63}
              className="mx-auto mb-8 transform hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Remplissez le formulaire ci-dessous pour entrer dans la phase de
              test de Snowledge
            </h2>
            <p className="text-gray-600 mb-8">
              Merci de nous aider à tester Snowledge dans sa phase de
              développement
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<FormValues, "firstName">;
                  }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Prénom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Votre prénom"
                          {...field}
                          className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<FormValues, "lastName">;
                  }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Votre nom"
                          {...field}
                          className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "email">;
                }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="votre@email.com"
                        {...field}
                        className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="how"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "how">;
                }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Comment nous avez-vous connu ?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                          <SelectValue placeholder="Sélectionnez une option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="search">
                          Moteur de recherche
                        </SelectItem>
                        <SelectItem value="social">Réseaux sociaux</SelectItem>
                        <SelectItem value="recommendation">
                          Recommandation
                        </SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="why"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "why">;
                }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Pourquoi nous rejoignez-vous ?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                          <SelectValue placeholder="Sélectionnez une raison" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="curious">Je suis curieux</SelectItem>
                        <SelectItem value="creator">
                          J&apos;ai une communauté
                        </SelectItem>
                        <SelectItem value="learner">
                          Je suis un apprenant
                        </SelectItem>
                        <SelectItem value="helper">
                          Je veux aider à tester Snowledge
                        </SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="language"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "language">;
                }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Langue préférée
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                          <SelectValue placeholder="Sélectionnez une langue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                Envoyer
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </Form>
  );
}
