# Coding Challenge
Access to the app: https://resolution-digital-challenge.herokuapp.com/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Syntax and Code Standard
*Computed Functions:* Pascal Case.  
*Data Variables:* Camel Case.  
*Methods:* Pascal Case.  
*Styles:* Param Case.  
*Data Formatting and Arrangement:* Ordered Alphabetically.  
*Styles*: Attempted to order by element name's first, then classes after. Overall ordered by elements appearing in order down the page.

### Commit Principles
*Summary: P## = Project Issue Number (https://github.com/Bozzeh/Project1/projects/1) - Replicated to work like JIRA issues*  
*Description: Work achieved/completed*    

## Approach to the Challenge
### Overview
It was an enjoyable challenge to tackle, some functionalities like the sorting and search filters are things I'm already familiar with and I was able to apply my knowledge to a different application, like this one. At one point I had a v-data-table in my List.vue file, which would automatically do the sorting and pagination solution for me, there is no fun in that though! As I'm typing this up, this challenge took 5h30m - 6hrs time to do and I'm happy with my performance in successfully making solutions for the key criteria. Early on in the challenge I implemented the jest vue unit test utility (see commit P06 - Jest unit test init (cfdf6521b0dada343e47ae9f953adae7a62bfc45)), which I tried to use however I have not had too much exposure previously to unit testing so the test I created for List.spec.js fails. After this challenge is reviewed I will come back into this project and tackle this unit testing problem to ensure I have a good understanding of this util and that the components do not fail. One other small thing I would've implemented into the code is a consts.js file containing constant vars for the data names rather than having == 0/1/2/3 all over the code, such as ```const ID = 0; const TYPE = 1; const POSTCODE = 2; const COMMENTS = 3; ```. I've had the challenge planned out in the link above in the Commit Principles sections.

### Components Structure and Grouping
To have the web app's key functionalities setup in their own components, with the data needed to make the component work passed through as props into the child components. Each component will have the data mutated accordingly by the other components.

### Data Structure
The data is initially stored as a JSON string in a plugins/data.js file, as it would be if it were to be received from a database query, but instead of performing a api request to the database for this challenge the data is just imported into the parent component App.vue. The data in the parent component can also always pass the mutated dataset to the child component whenever it does change so all components can be up to date. Also how there is 2 filter methods that use the same function to perform essentially the same thing but for it's individual purpose.  

### Styling Architecture
I decided to use the Vuetify material framework for inputs and containers, which allows for easy dom management and responsiveness while time limited. All over the html I have overridden the CSS to provide custom styles, primarily for a better user feel, cleaner design and to try match the example customisations. 