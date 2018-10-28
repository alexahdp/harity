import program from 'commander';
import db from '../model/db';
import Candidate from '../model/candidate';

program.command('test')
  .action(async function() {

  });

  program.parse(process.argv);

