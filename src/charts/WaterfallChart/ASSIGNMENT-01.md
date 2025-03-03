## Front-End Developer Homework Assignment: Vertical Waterfall Chart Component in React & TypeScript

### Objective:
Build an interactive waterfall chart to display data. 

Add your code to the [WaterfallChart](/packages/interface/src/charts/WaterfallChart/WaterfallChart.tsx) component. Your task is to create a waterfall chart that shows all the data given in the series prop. 

### Example for Vertical Waterfall Chart:

Below is a basic example of the expected Vertical Waterfall Chart. Use this as a starting point for layout and functionality, but feel free to apply your creativity and technical skills to meet the assignment's requirements. Remember, this is a guide, and your final design may vary based on your interpretation and choices.

![Waterfall chart](/images/waterfallchart.png)

### Requirements:

1. **Technology Stack**:
   - Use React and TypeScript.
   - Ensure compatibility with Storybook for React.
   - For visualizations, we've used Airbnb's Visx library but feel free to choose any method you prefer. Just add a note explaining your choice, focusing on aspects like performance, ease of use, or your familiarity with the tool.

1. **Chart Design and Functionality**:
   - The initial state of the chart should show bars for the start, end, and each change in the given series.
   - The "end" column is not given in the series, this must be computed based on the start and change columns.
   - Clicking any change bar removes it from the series and the chart should show one less bar.
   - Minimum chart width of 300px.
   - Clearly labeled y-axis for each column.
   - Visually distinct lines connecting columns.

1. **Value Formatting**:
   - Format values as currency or fixed decimal points based on `format`.

1. **Line Behavior**:
   - Lines should visually connect the tops of consecutive columns.
   - Ensure lines are clearly visible and aesthetically consistent with the chart design.
   - Lines represent the transition of values between columns.

1. **Styling and Theming**:
   - Prefer the use of SASS, but open to other styling frameworks.
   - Bonus: Implement both dark and light themes. The method of theme implementation is up to the developer.

1. **Storybook Integration**:
   - Create a Storybook story for the component.
   - Include one example input and additional examples to illustrate corner cases.
   - Bonus: Showcase various configurations and themes.

1. **Documentation**:
   - Comment code using TSDoc.
   - If any additional setup is required, add documentation to the README.

1. **Testing**:
   - Write unit tests for different prop configurations.

### Getting Started:
In the project root: 

$ `pnpm i`

Move to the assignment root for the following:

$ `cd ./packages/interface`

$ `pnpm i`

Run the Storybook:

$ `pnpm run storybook`

### Submission Guidelines:

- Create a GitHub repository, push the original assignment to `main`, create a branch with your submission and open a PR. Your Trace contact will provide users to add as contributors to the repository for review. 
- Ensure Storybook is correctly set up for local running.
