// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import createConfig from '../../webpack.config.prod.base';
import {run} from './webpackRun';
import {chalkError, chalkProcessing} from "../chalkConfig";

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.


if (process.env.MODULE) {
    console.log(chalkProcessing('MODULE: ' + process.env.MODULE));
    console.log(chalkProcessing('Generating minified bundle. This will take a moment...'));
    const config = createConfig(process.env.MODULE);
    webpack(config).run(run);
} else {
    console.log(chalkError("MODULE NOT FOUND"));
}




