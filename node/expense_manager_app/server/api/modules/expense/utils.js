const { isEmpty, readFileAsync } = require("../../../utils");
var moment = require("moment");

const replaceSlashToHypenInDateAndReverseFormat = dateString =>
  isEmpty(dateString)
    ? dateString
    : dateString
        .split("/")
        .reverse()
        .join("-");

module.exports = {
  isRequiredFieldsPresent: ({
    id,
    title,
    category,
    description,
    amount,
    expenseDate
  }) =>
    !isEmpty(id) &&
    !isEmpty(title) &&
    !isEmpty(category) &&
    !isEmpty(description) &&
    !isEmpty(amount) &&
    !isEmpty(expenseDate),
  getExpenseByFilter: (
    expenseArr,
    { params: { category }, query: { startDate, endDate } }
  ) => {
    if (isEmpty(category) && isEmpty(startDate) && isEmpty(endDate)) {
      return expenseArr;
    }
    let formattedStartDate = replaceSlashToHypenInDateAndReverseFormat(
      startDate
    );
    let formattedEndDate = replaceSlashToHypenInDateAndReverseFormat(endDate);

    const _isValidDate = (sDate, eDate, exDate) => {
      let mExDate = moment(replaceSlashToHypenInDateAndReverseFormat(exDate));
      return sDate && eDate
        ? mExDate.isBetween(sDate, eDate, null, "[]")
        : mExDate.isSameOrAfter(sDate);
    };

    return expenseArr.filter(({ category: expCat, expenseDate }, index) =>
      category
        ? expCat === category &&
          _isValidDate(formattedStartDate, formattedEndDate, expenseDate)
        : _isValidDate(formattedStartDate, formattedEndDate, expenseDate)
    );
  }
};
