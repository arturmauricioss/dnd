import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '@features/theme/hooks/useThemeContext';
import Page from '@components/shell/Page/Page';
import Title from '@components/ui/basic/Title/Title';
import RowHeader from '@components/ui/common/RowHeader/RowHeader';
import RowToggle from '@components/ui/common/RowToggle/RowToggle';
import RowButton from '@components/ui/common/RowButton/RowButton';
import { useAuth } from '@hooks/useAuth';
import { LightMode, DarkMode, Logout } from '@components/ui/icons';

export default function ConfigPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeContext();
  const { signOut } = useAuth();

  const ThemeIcon = theme === 'dark' ? DarkMode : LightMode;

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <Page>
      <Title size="xl" className="">
        Configurações
      </Title>

      <RowHeader icon={ThemeIcon} active>
        Tema
      </RowHeader>

      <RowToggle
        label={theme === 'dark' ? 'Modo escuro' : 'Modo claro'}
        active={theme === 'dark'}
        onClick={toggleTheme}
      />

      <RowHeader icon={Logout} active>
        Conta
      </RowHeader>

      <RowButton
        buttons={[
          { label: 'Sair', onClick: handleLogout, variant: 'secondary' },
        ]}
      />
    </Page>
  );
}
