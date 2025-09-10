import { Mail, Phone, MapPin, Send } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";
import { Button } from "@inewlegend/website/src/components/ui/button";
import { Input } from "@inewlegend/website/src/components/ui/input";
import { Textarea } from "@inewlegend/website/src/components/ui/textarea";
import { config } from "@inewlegend/website/src/config";

export function Contact() {
    return (
        <section id="contact" className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{config.contact.title}</h2>
                    <p className="text-lg text-muted-foreground">
                        {config.contact.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">{config.contact.info.title}</h3>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 mr-3 text-primary" />
                                <a href={`mailto:${config.contact.info.email}`} className="hover:text-primary transition-colors">
                                    {config.contact.info.email}
                                </a>
                            </div>

                            <div className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 text-primary" />
                                <a href={`tel:${config.contact.info.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                                    {config.contact.info.phone}
                                </a>
                            </div>

                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 mr-3 text-primary" />
                                <span>{config.contact.info.location}</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="text-lg font-semibold mb-4">{config.contact.message.title}</h4>
                            <p className="text-muted-foreground mb-4">
                                {config.contact.message.content}
                            </p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="First Name" />
                                    <Input placeholder="Last Name" />
                                </div>

                                <Input placeholder="Email" type="email" />
                                <Input placeholder="Subject" />

                                <Textarea
                                    placeholder="Your message..."
                                    className="min-h-[120px]"
                                />

                                <Button className="w-full">
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
