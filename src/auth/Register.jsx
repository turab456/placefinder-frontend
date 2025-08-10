import React,{ useState } from "react";

import axios from "axios";
import { Card, CardContent } from "../components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = mode === "login" ? "/api/login" : "/api/register";
    try {
      const res = await axios.post(url, formData);
      alert("Success: " + res.data.message);
    } catch (err) {
      alert("Error: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
        backgroundSize: "cover",
        backgroundBlendMode: "lighten",
      }}
    >
      <Card className="w-full max-w-sm shadow-2xl rounded-2xl">
        <CardContent className="p-6">
          <Tabs defaultValue="login" onValueChange={setMode} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Button className="w-full" type="submit">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Button className="w-full" type="submit">Register</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
