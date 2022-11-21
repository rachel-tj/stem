import csv, json

filename = "data.csv"

# Turns letters into numbers, basically
genderDict = {"Man": 1, "Woman": 2, "Nonbinary": 3}
ageDict = {"Freshman": 1, "Sophmore": 2, "Junior": 3, "Senior": 4,
           "Older (but not a professor, oh god I hope there aren't any professors using this)": 6}
majorDict = {"Engineering Related (including computer stuff)": 1, "Science Related": 2, "Math Related": 3,
             "Art Related": 4}
# This starts at 1 and not 0 since the person's major is stored at index 0
questionsDict = {"Drinking": 1, "Drugs": 2, "Smoking": 3, "Harder drugs": 4, "Settling down": 5, "Children": 6,
                 "Unpredictability": 7, "Money stuff": 8, "Life of the party": 9, "Sex importance": 10,
                 "Apologizing": 11, "Rule The World": 12, "Scenic Route": 13, "Criticism": 14, "Stable = boring": 15,
                 "Social activism": 16, "Environmentalism": 17, "Wait till sex": 18, "Ghosting": 19, "Exercising": 20,
                 "Caregiver": 21, "Reinventing yourself": 22, "Monogamy": 23, "Long distance": 24,
                 "Relationship Readiness": 25, "Venting": 26, "Laughing at yourself": 27, "Sharing feelings": 28,
                 "Non-PC humor": 29, "Extreme Ambition": 30, "Past": 31, "Filter": 32, "Rules": 33,
                 "Hurting people": 34, "Planner": 35, "Ultimatums": 36, "Intelligence": 37,
                 'Saying "I love you" too quickly': 38, "Parents": 39, "Getting ahead": 40, "Arguments": 41,
                 "Practicality vs Passion": 42, "Divorce": 43, "Feeling Games": 44}

# Turns the CSV into a properly formatted json file
data = {}
with open(filename) as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Extracts the name, email, age, and gender
        email = row["CWRU Email"]
        row.pop("CWRU Email")
        name = row["Full Name"]
        row.pop("Full Name")
        age = ageDict[row["Year"]]
        row.pop("Year")
        gender = genderDict[row["Gender Identity"]]
        row.pop("Gender Identity")

        # Gets the targeted demographics
        targets = row["Seeking a"].split(";")
        i = 0
        for demographic in targets:
            targets[i] = genderDict[demographic]
            i += 1
        row.pop("Seeking a")

        # Gets the questions that are gonna be weighted more
        weightIndexes = row["Which questions are most important to you?"].split(";")
        i = 0
        for ques in weightIndexes:
            weightIndexes[i] = questionsDict[ques]
            i += 1
        row.pop("Which questions are most important to you?")

        # Deletes the data that don't factor into the analysis
        row.pop("I understand that this is a test version of an eventual Divorce Pact website for testing purposes, and "
                "someone will probably have to look at my responses in order to make sure the algorithm works. My "
                "responses won't go into the actual Divorce Pact.")
        row.pop("Timestamp")
        row.pop("Do you have any ideas for the full version of this once I finish the coding?")

        # Now all that's left is the question data
        # First fixes the major
        row["Major"] = majorDict[row["Major"]]

        # Cycles through every question, extracting every answer and shoving it into a list
        ansList = []
        for key in row:
            ansList.append(int(row[key]))

        #This person is formatted!
        data[email] = {"name": name, "age": age, "gender": gender, "targets": targets,
                             "weightIndexes": weightIndexes, "answers": ansList}

# Saves the json
with open(f"data.json", "w") as file:
    json.dump(data, file, indent=4)


# Now to match the people together!

masterMatchList = {}
for person in data.items():
    personAnswers = person[1]["answers"]
    personWeightIndexes = person[1]['weightIndexes']
    # Cycles through each person for each person, there's probably a better way to do this but whatever
    targets = person[1]["targets"]
    matchList = []
    for match in data.items():
        # Checks if the gender matches the targets, the target's gender matches the person's targets,
        # if the target has a match already, and that they're not the same person
        if match[1]["gender"] in targets and person[1]["gender"] in match[1]["targets"] and "antisoulmate" not in match[1] and match != person:
            # Now for the comparison! This just takes the weighted average of the difference of all the questions.
            matchAnswers = match[1]["answers"]
            matchWeightIndexes = match[1]['weightIndexes']

            # I know this is a joke project, but I'm still trying to stop any creepy age gaps. It's inverted since I'm
            # matching based on the highest weighted average, not the lowest, and age is something I want to keep as
            # close as possible.
            numerator = 20 * (5 - abs(person[1]['age'] - match[1]['age']))
            denominator = 20
            diffList = []
            weightList = []

            # Weighted average is just the sum of the inputs times their weights over the sum of all the weights, this
            # is pretty straightforward
            for i in range(len(personAnswers)):
                weight = 1
                # Gets the difference
                difference = abs(personAnswers[i] - matchAnswers[i])
                diffList.append(difference)
                # Gets the weight
                if i in personWeightIndexes:
                    weight += 5
                if i in matchWeightIndexes:
                    weight += 5
                weightList.append(weight)
                numerator += difference * weight
                denominator += weight
            #Stores the matches as a list of tuples
            matchList.append((numerator/denominator, match[0]))
    #remove reverse=True to get an actual marriage pact
    matchList.sort(reverse=True)
    masterMatchList[person[0]] = {'potentialMatches':matchList}

print(masterMatchList)

emergencyMatches = masterMatchList.copy()

matchesAvailable = True
#This code is super confusing, but basically what it does is it cycles through each person's highest match, checks
# their highest match's highest match, and if they line up it matches them with each other and removes them from the
# masterMatchList. If they don't line up it tries again with the new masterMatchList.
def findMatch(masterMatchList):
    global matchesAvailable
    for person in masterMatchList.items():
        if len(person[1]['potentialMatches']) > 0:
            highestMatch = person[1]['potentialMatches'][0]
            try:
                if masterMatchList[highestMatch[1]]['potentialMatches'][0][1] == person[0]:
                    # Found the best possible match! Let's delete all mentions of these people now!
                    masterMatchList.pop(person[0])
                    masterMatchList.pop(highestMatch[1])
                    return person[0], highestMatch[1]
            except KeyError:
                # This person must have already found a match, let's get rid of them.
                masterMatchList[person[0]]['potentialMatches'].pop(0)
                return
        else:
            #No matches found
            masterMatchList.pop(person[0])
            return(person[0])
    matchesAvailable = False
    return

finalMatches = []
unmatched = []
while matchesAvailable == True:
    newMatch = findMatch(masterMatchList)
    if type(newMatch) == str:
        unmatched.append(newMatch)
    elif type(newMatch) == tuple:
        finalMatches.append(newMatch)

# Saves the json
with open(f"matches.json", "w") as file:
    json.dump(finalMatches, file, indent=4)

# Saves the json
with open(f"unmatched.json", "w") as file:
    json.dump(unmatched, file, indent=4)
