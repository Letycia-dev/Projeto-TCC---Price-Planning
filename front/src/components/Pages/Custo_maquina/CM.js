import { useState } from 'react';
import Get_CM from './Get/Get_CM.js';
import Post_CM from './Post/Post_CM.js';
import Put_CM from './Put/Put.js';
import Delete_CM from './Delete/Delete_CM.js';
import Style from "./CM.module.css"
import SideBar from '../../Layout/Menu Latertal/MenuLateral.js'

const CM = () => {

  const [Tela, SetTela] = useState('Get_CM');

  const MostrarTela = () => {

    switch (Tela) {
      case 'Get_CM':
        return <Get_CM TelaExibida={SetTela} />;
      case 'Post_CM':
        return <Post_CM TelaExibida={SetTela} />;
      case 'Put_CM':
        return <Put_CM TelaExibida={SetTela} />;
      case 'Delete_CM':
        return <Delete_CM TelaExibida={SetTela} />;
      default:
        return <div>Componente não encontrado!</div>;
    }
  };

  return (
    <div className={Style.BarraLateralCM}>
      <div>
        <SideBar />
      </div>
      <div className={Style.Main_CM}>
        {MostrarTela()}
      </div>
    </div>
  )
}

export default CM;

