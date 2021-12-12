# Random Selector

- the app randomly selects requested number of items from provided list
- use "GCal's send email to guests" to copy names as a list
- paste a list with one item per line into the text area and click Add
- the app will remove duplicated and empty lines
- after adding a list, choose the number of items to be selected
- the number has to less or equal to the remaining number of items
- click Randomly Select
- the app will print chosen items

## Development and Deployment

1. install `nodejs`
1. clone the repo and install npm packages `npm install`
1. use your preferred IDE to develop the code in `src/App.js`
1. once ready then submit `npm run build`
1. `npx gulp`, this will modify the `build/index.html` to be monolith file
   that can be deployed by itself (e.g. embed in Google Sites)

### Deployed App
https://random-selector.englishapps.ca

## References

- [How to Bundle your React App in a Single File](https://www.labnol.org/code/bundle-react-app-single-file-200514)
- [google-spreadsheets library](https://theoephraim.github.io/node-google-spreadsheet/)

