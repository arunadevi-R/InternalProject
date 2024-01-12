const sendBirthdayEmail = require('./config');
const nodeCron = require ("node-cron");
const employees = [
  { name: 'Arunadevi', email: 'arunadevi.r@hawfinch.in' , birthday: '11/06' },
  { name: 'Mr. Pandithan', email: 'pandithan@hawfinch.in', birthday: '07/27' },
  { name: 'Mr. Deepan', email: 'deepan@hawfinch.in', birthday: '07/06' },
  { name: 'Yuvaraj', email:'yuvaraj.v@hawfinch.in', birthday: '06/11' },
  { name: 'Bala Sabarish', email: 'balasabarish.s@hawfinch.in', birthday: '03/02' },
  { name: 'Sri Ram', email: 'sriram.m@hawfinch.in', birthday: '07/03' },
  // { name: 'Ganesh Raj', email: '', birthday: '04/25' }
];

const today = new Date();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();
const hour = 0;

let birthdayEmployeeName = '';
nodeCron.schedule(`0 ${hour} * * *`, () => {
employees.forEach(employee => {
  const [month, day] = employee.birthday.split('/');
  
  if (month == todayMonth && day == todayDay) {
    const subject = `Happy Birthday, ${employee.name} ! `;
    const text = `<div>
    <p>Dear ${employee.name},<br> Wishing you a fantastic birthday filled with joy and celebration! &#127881; &#127874;.</p>
    <img src="cid:birthdayCard" />
    <p>--</p>
    <p>Regards,<p>
    <p> Hawfinch Team<br>Hawfinch Technologies Private Limited,<br>ESI Ring Road, Above Green Star,<br>Hosur, Tamil Nadu 635109.</p>
    <div>`;
    
    sendBirthdayEmail(employee.email, subject, text);
    birthdayEmployeeName = employee.name;
  }
});

if (birthdayEmployeeName !== '') {
  const sub = `Today is ${birthdayEmployeeName}'s birthday`;
  const text = `<p>Dear Team,<br><br> Just a friendly reminder that today is <b>${birthdayEmployeeName}'s birthday! </b>. Let's wish them a great day! &#127881;.<p>
  <br><br>
  <p>--</p>
  <p>Regards,<p>
  <p><span style={color:blue}> <b>Hawfinch Team,</b></span> <br>Hawfinch Technologies Private Limited,<br>ESI Ring Road, Above Green Star,<br>Hosur, Tamil Nadu 635109.</p>
  `;

  employees.forEach(employee => {
    if (employee.name !== birthdayEmployeeName) {
      sendBirthdayEmail(employee.email, sub, text);
    }
  });

}
});