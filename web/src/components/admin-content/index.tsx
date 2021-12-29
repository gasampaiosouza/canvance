import AdminBox from './box';
import { Container } from './styles';

const AdminContent = () => {
  return (
    <Container>
      <AdminBox title="Gerenciar usuários" to="/admin/users" />
      <AdminBox title="Gerenciar tarefas" to="/admin/tasks" />
      <AdminBox title="Gerenciar categorias" to="/admin/categories" />
    </Container>
  );
};

export default AdminContent;
