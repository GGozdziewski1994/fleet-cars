const transformDate = dbDate => {
    const date = dbDate.split('T');
    const dbHour = date[1].split('.')[0].split(':');
    const hour = `${(+dbHour[0] + 1) < 10 ? `0${+dbHour[0] + 1}` : +dbHour[0] + 1}:${dbHour[1]}:${dbHour[2]}`;
    return hour.concat(' ', date[0].split('-').reverse().join('.'));
};

export default transformDate;