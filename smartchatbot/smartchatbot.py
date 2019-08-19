import requests



responses = {
    "what": "An airplane or aeroplane (informally plane) is a powered, fixed-wing aircraft that is propelled forward by thrust from a jet engine, propeller or rocket engine.",
    "where": "Any airport that has the proper means to support a aircraft of that side",
    "who": " Worldwide, commercial aviation transports more than four billion passengers annually on airliners[1] and transports more than 200 billion tonne-kilometres[2] of cargo annually",
    "why": "The broad spectrum of uses for airplanes includes recreation, transportation of goods and people, military, and research",
    "how": "Anywhere from $5,000,000 to $432,000,000"

}

def processIntent(intent):
    key = intent["class_name"].lower()
    confidence = intent["confidence"] 


    if confidence < 40:
        return("I don't know that")


    if key  in responses:
        return responses[key]
    else:
        return("I don't know that")

    

# This function will pass your text to the machine learning model
# and return the top result with the highest confidence
def classify(text):
    key = "c5de1790-c2b0-11e9-a971-e3949585133e1c7911c6-b7a7-4ef5-a618-62b828cd217e"
    url = "https://machinelearningforkids.co.uk/api/scratch/"+ key + "/classify"

    response = requests.get(url, params={ "data" : text })

    if response.ok:
        responseData = response.json()
        topMatch = responseData[0]
        return topMatch
    else:
        response.raise_for_status()

response = classify("How much do airplanes cost?")
print(response)

def main():
    print("Welcome to Airplane Facts! I can talk to you about airplanes\n")
    print("Ask me a question or type quit\n")


    userInput = ""

    while userInput != "quit":
        userInput = input("What's your question?").lower()
        #print(userInput)
        if userInput != "quit":
            intent = classify(userInput)
            response = processIntent(intent)
            print(response)

    print("Goodbye, thanks for stopping by!")

    





main()