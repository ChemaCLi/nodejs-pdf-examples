import chalk from "chalk";
import {
  generateHelloWorldPDF
} from "./examples/hello-world.js";

const log = console.log;

log(chalk.white('Hi there, this is a hello world example.'));
generateHelloWorldPDF();
log(chalk.green('1, 2, 3, pum! hello-world.pdf has been generated in the outputs folder. \n'));

log(chalk.yellow('Check out the examples directory for more fun. See ya!'));
