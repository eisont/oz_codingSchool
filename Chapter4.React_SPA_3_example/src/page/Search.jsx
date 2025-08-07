import { getRegExp } from 'korean-regexp';
import { Link, useSearchParams } from 'react-router-dom';
import { data } from '../assets/data/data';

const Search = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get('animal');
  const reg = getRegExp(param);

  const filteredData = data.filter((el) => el.name.match(reg)); // 정규식을 사용할 경우 match를 사용

  return (
    <ul>
      {filteredData.map((el) => (
        <li key={el.id}>
          <Link to={`/detail/${el.id}`}>
            <img src={el.img} />
            <div>{el.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Search;
