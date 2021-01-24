const dataElement = (page, maxSize, employeeAll) => {
  if (employeeAll.lenght === 0) return;
  const min = page * maxSize;
  const max = page * maxSize + maxSize;
  console.log(min, max);
  return (
    <table className="Table">
      {employeeAll.slice(min, max).map((employee, index) => (
        <tr>
          <th className="CellSmall"># {min + index + 1}</th>
          <td className="CellBig">{employee.name}</td>
          <td className="CellBig">{employee.amount}</td>
        </tr>
      ))}
    </table>
  );
};

export default dataElement;
