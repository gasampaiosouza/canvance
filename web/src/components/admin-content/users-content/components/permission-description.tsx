import { PermissionLevelDescription } from '../styles';

export const PermissionDescription = () => {
  return (
    <PermissionLevelDescription>
      <h4>Níveis de permissão do usuário</h4>

      <ul>
        <li>
          <strong>1</strong> - Administrador
        </li>
        <li>
          <strong>2</strong> - Usuário comum
        </li>
        <li>
          <strong>3</strong> - Usuário comum 2
        </li>
      </ul>
    </PermissionLevelDescription>
  );
};
