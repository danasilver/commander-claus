var _ = require('lodash'),
    nodemailer = require('nodemailer'),
    fs = require('fs');

module.exports = function (options) {
  options = _.defaults(options, {'subject': 'Secret Santa',
                                 'from': 'secret@san.ta'});

  this.transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.CLAUSUSER,
      pass: process.env.CLAUSPASSWORD
    }
  });

  this.pairs = pairUp(_.result(options, 'names'));

  this.sendMail = function () {
    var subject = _.template(fs.readFileSync('templates/subject.txt', 'utf8')),
        text = _.template(fs.readFileSync('templates/message.txt', 'utf8')),
        html = _.template(fs.readFileSync('templates/message.html', 'utf8'));

    this.pairs.forEach(_.bind(function (pair) {
      var mailOptions = {
        from: process.env.CLAUSEMAIL || _.result(options, 'from'),
        to: pair[0].email,
        subject: subject({subject: _.result(options, 'subject')}),
        text: text({ giver: pair[0].name, receiver: pair[1].name }),
        html: html({ giver: pair[0].name, receiver: pair[1].name })
      };

      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) throw new Error(error);
      });
    }, this));
  }
};

function pairUp (array) {
  var to = _(array).shuffle(), pairs = [];

  _(array).shuffle().each(function (name) {
    if (!_.isEqual(name, to.last())) {
      pairs.push([name, to.pop()]);
    } else {
      pairs.push([name, to.shift()]);
    }
  });
  return pairs;
}
