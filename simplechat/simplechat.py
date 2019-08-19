prompts = {
    "what": "What is a airplane?",
    "where": "Where can they be flown?",
    "who": "Who flies on airplanes?",
    "why": "Why are they nessecary?",
    "how": "How much do airplanes cost?"

}

responces = {
    "what": "An airplane or aeroplane (informally plane) is a powered, fixed-wing aircraft that is propelled forward by thrust from a jet engine, propeller or rocket engine.",
    "where": "Any airport that has the proper means to support a aircraft of that side",
    "who": " Worldwide, commercial aviation transports more than four billion passengers annually on airliners[1] and transports more than 200 billion tonne-kilometres[2] of cargo annually",
    "why": "The broad spectrum of uses for airplanes includes recreation, transportation of goods and people, military, and research",
    "how": "Anywhere from $5,000,000 to $432,000,000"

    
}





def processInput(userInput):
    #return"Hello"
    pass 

def main():
    print("Welcome to Airplane Facts! I can talk to you about airplanes\n")
    print("Ask me a question or type quit\n")


    userInput = ""

    while userInput != "quit":
        userInput = input("What's your question?").lower()
        #print(userInput)
        if userInput != "quit":
            response = processInput(userInput)
            print(response)

    print("Goodbye, thanks for stopping by!")

    





main()