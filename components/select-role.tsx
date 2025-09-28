"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const roles = ["Farmer", "Collector", "Lab", "Manufacturer"];

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [assigned, setAssigned] = useState<boolean>(false);

  const assignRole = () => {
    if (!selectedRole) {
      toast.error("Please select a role before proceeding.");
      return;
    }

    // TODO: Call backend API to save the role
    setAssigned(true);
    toast.success(`You have been assigned the role: ${selectedRole}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Select Your Role
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <RadioGroup
            value={selectedRole}
            onValueChange={setSelectedRole}
            className="grid grid-cols-2 gap-4"
          >
            {roles.map((role) => (
              <label
                key={role}
                htmlFor={role}
                className={`cursor-pointer rounded-lg border p-4 flex items-center justify-center font-medium transition-all
                  ${selectedRole === role ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/70"}
                  ${assigned ? "pointer-events-none opacity-50" : ""}`}
              >
                <RadioGroupItem value={role} id={role} className="hidden" />
                {role}
              </label>
            ))}
          </RadioGroup>

          <Button
            className="mt-4 w-full"
            onClick={assignRole}
            disabled={assigned}
          >
            {assigned ? "Role Assigned" : "Assign Role"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
