const todoScreen = ({ list = [] }) => (
  <table>
    {list.map((item, i) => (
      <tr>
        <td> {item.title}</td>
        <td>{item.description}</td>
        <td>{item.userId} </td>
      </tr>
    ))}
  </table>
);

export default todoScreen;
