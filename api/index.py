import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def handle_contact(form: ContactForm):
    # For the sake of this example, we're just printing the submission to the console
    print(f"Received contact form submission: {form}")

    # Here you would add the logic to save to your database or send an email
    # Assuming successful handling of the contact form:
    return {"success": True}