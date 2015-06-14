if ( Meteor.users.find().count() === 0 ) {
    var id = Accounts.createUser({
        username: 'blanche',
        email: 'blanche@email.com',
        password: 'blanche',
        profile: {
            firstName: 'Blanche',
            surname: 'Simmons',
            role: "admin"
        }


    });

/*    var data = {
      roles: "",
      pastYear: "",
      liked: "",
      disliked: "",
      describe: ["","","","",""],
      time: 50,
      stress: "Never",
      satisfaction: {
        "Work": 0,
        "Fun": 0,
        "Money": 0,
        "Friends": 0,
        "Health": 0
      },
      skill:{

        "Organisation": 0,
        "Initiative": 0,
        "Accuracy": 0,
        "Creativity": 0,
        "Flexibility": 0,
        "Solving": 0
      }
    }; */

/*

    var questions = [
      {
        name: "roles",
        question: "A1",
        text: "What are your main roles and responsibilities",
        type: "textArea",
        default: ""
      },
      {
        name: "pastYear",
        question: "A2",
        text: "How has the past year been for you at <i>+3 Architecture</i> generally",
        type: "textArea",
        default: ""
      },
      {
        name: "liked",
        question: "A3",
        text: "<strong>Please choose a maximum of five words</strong> to describe what have yo liked about working for <i>+3 Architecture</i> over the last year? If unknown please leave blank.",
        type: "words",
        max: 5,
        default: ""
      },
      {
        name: "disliked",
        question: "A4",
        text: "<strong>Please choose a maximum of five words</strong> to describe what have yo liked about working for <i>+3 Architecture</i> over the last year? If unknown please leave blank.",
        type: "words",
        max: 5,
        default: ["", "", "", "", ""]
      },

      {
        name: "time",
        question: "A5",
        text: "Are you given enough time to complete tasks well? <strong>Use the slider to indicate your view.</strong>",
        type: "slide",
        low: "Not enough",
        mid: "About right",
        high: "Plenty of time",
        default: 50
      },
      {
        name: "highlights",
        question: "A6",
        text: "<strong>Describe</strong> any professional highlights of the last year?",
        type: "textArea",
        default: ""
      },
      {
        name: "lowlights",
        question: "A7",
        text: "<strong>Describe</strong> any professional lowlights of the last year?",
        type: "textArea",
        default: ""
      },
      {
        name: "interesting",
        question: "A8",
        text: "What have you found <strong>interesting</strong> about your job over the last year?",
        type: "textArea",
        default: ""
      },
      {
        name: "challenging",
        question: "A9",
        text: "What have you found <strong>challenging</strong> about your job in the last year? (This can be in both a good or bad sense)",
        type: "textArea",
        default: ""
      },
      {
        name: "satisfaction",
        question: "A10",
        text: "Please <strong>rate your satisfaction</strong> in relation to each of the categories below. 1 - Unsatisfied and 10 - Satisfied.",
        type: "radar",
        options: ["Work", "Fun/Recreation", "Money", "Friends & Family", "Health"],
        default: {
          "Work": 0,
          "Fun": 0,
          "Money": 0,
          "Family": 0,
          "Health" :0
        }
      },
      {
        name: "balance",
        question: "A11",
        text: "How would you rate your work - life balance? <strong>Use the slider to indicate your view</strong>",
        type: "slide",
        low: "Work",
        mid: "Happy medium",
        high: "Life",
        default: 50
      },
      {
        name: "stress",
        question: "A12",
        text: "How often do you find yourself under stress at work? <strong>Please select where appropriate</strong>",
        type: "radio",
        options: [
          {
            optionName: "Daily",
            text: "Daily"
          },
          {
            optionName: "Weekly",
            text: "Weekly"
          },
          {
            optionName: "Monthly",
            text: "Monthly"
          },
          {
            optionName: "Annually",
            text: "Annually"
          },
          {
            optionName: "Never",
            text: "Never"
          }
        ],
        default: "Never"

      },
      {
        name: "skill1",
        question: "B1",
        text: "Read the definition below and then <strong>please rate your skill level</strong> in relation to each." +
              "<strong>Please click where appropriate.</strong> 1 = Poor, 10 = excellent.<br>" +
              "Self Organisation/meeting deadlines<br>" +
              "Prioritises effectively to meet deadlines, turns around work in a timely fashion.<br>" +
              "Initiative<br>" +
              "Displays initiative, enthusiasm and commitment, upholds firm's culture and values.<br>" +
              "Accuracy<br>" +
              "Approaches tasks with a desire for perfection, output is accurate and precise.<br>" +
              "Creativity<br>" +
              "Displays a creative approach to projects and challenges.<br>" +
              "Flexibility<br>" +
              "Display flexibility when confronted with new challenges.<br>" +
              "Problem Solving<br>" +
              "Displays an apptitude for problem solving, approaches new challenges with an open mind.",
        type: "radar",
        options: ["Self Organisation", "Initiative", "Accuracy", "Creativity", "Flexibility", "Problem Solving"],
        default: {

          "Organisation": 0,
          "Initiative": 0,
          "Accuracy": 0,
          "Creativity": 0,
          "Flexibility": 0,
          "Solving": 0
        }
      },
      {
        name: "skill2",
        question: "B1",
      text: "Read the definition below and then <strong>please rate your skill level</strong> in relation to each." +
          "<strong>Please click where appropriate.</strong> 1 = Poor, 10 = excellent.<br>" +
          "<small>Commercial Management<br>" +
          "Balances understanding of design and commercial consideration, manages own workload effectively to meet deadlines and<br>" +
          "maintain profitability<br>" +
          "Teamworking<br>" +
          "Listen to the views of others, shows awareness and willingness to help.<br>" +
          "Leadership" +
          "Provides support and assistance to others, demonstrates flexibility, provides clear and concise briefs, ensures strengths of the" +
          "team are fully utilised<br>" +
          "Internal Communication<br>" +
          "Communicates well with colleagues.<br>" +
          "External Communication<br>" +
          "Communicates well with clients/external consultants.<br>" +
          "Research<br>" +
          "Where appropriate embarks on research to solve problems and extend knowledge.</small>",
        type: "radar",
        options: ["Comm. management", "Research", "Teamworking", "Leadership", "This is a real long lable to see what it looks like", "Ext. Communication"],
      default: {

        "Organisation": 0,
        "Initiative": 0,
        "Accuracy": 0,
        "Creativity": 0,
        "Flexibility": 0,
        "Solving": 0
        }
      },

      {
        name: "skill3",
        question: "B4",
        text: "Read the definition below and then <strong>please rate your skill level</strong> in relation to each." +
        "<strong>Please click where appropriate.</strong> 1 = Poor, 10 = excellent.<br>" +
        "<small>Archetype<br>" +
        "Use of all archetypes systems.<br>" +
        "Autocad<br>" +
        "Efficient use of autocad, able to produce accurate drawings in a timely fashion.<br>" +
        "Revit<br>" +
        "Efficient use of revit, able to produce accurate drawings in a timely fashion.<br>" +
        "Graphical Communication<br>" +
        "Able to produce clear diagrams and drawings to clearly communicate a message.<br>" +
        "Written Communication<br>" +
        "Produces clear, accurate and concise written work.<br>" +
        "Indesign<br>" +
        "Able to use efficiently to produce clear documents..</small>",
        type: "radar",
        options: ["Archetype", "Autocad", "Revit", "Graphical Communication", "Written Communication", "Indesign"],
        default: {

          "Archetype": 0,
          "Autocad": 0,
          "Revit": 0,
          "Graphical": 0,
          "Written": 0,
          "Indesign": 0
        }
      },
      {
        name: "improve",
        question: "B5",
        text: "What could you do to improve your skills?",
        type: "textArea",
        default: ""
      },
      {
        name: "improve2",
        question: "B6",
        text: "What could management do to help you improve your skills?",
        type: "textArea",
        default: ""
      },


          ];




    var data = {};

    _.each(questions, function(question) {
      Questions.insert(question);
      data[question.name] = question.default;
    });

    Reviews.insert({
      user: id,
      data: data,
      status: "open"});

*/
}
