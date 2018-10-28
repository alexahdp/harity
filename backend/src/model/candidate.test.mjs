import * as mongoose from 'mongoose';
import _Mockgoose from 'mockgoose';
const { Mockgoose } = _Mockgoose;

let mockgoose = new Mockgoose(mongoose);
import db from '../model/db';

import Candidate from './candidate';

describe('candidate model', () => {
  it('test save',  async function() {
    let candidates = await Candidate.find().exec();
    console.log(candidates.length)

    const candidate = new Candidate({
      birthYear: '',
      contacts: {
        email: '',
        phone: '111',
        skype: '',
        github: '',
      },
      description: '',
      firstName: 'Ivan',
      lastName: 'Petrov',
      level: 'none',
      sex: 'none',
      skills: [],
    });
    await candidate.save()

    candidates = await Candidate.find().exec();
    console.log(candidates.length)
  });
});
