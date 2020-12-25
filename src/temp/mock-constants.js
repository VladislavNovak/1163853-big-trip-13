import {getRandomInteger} from '../utils';
import {getPhoto} from './mock-service';

export const CHANCE_EVENTS_COUNT = 20;
export const CHANCE_DAYS_GAP = 7;
export const CHANCE_PHOTOS_COUNT = 7;

export const GenerateMode = {
  AS_NEW_COMPONENT: `AS_NEW_COMPONENT`,
  AS_EDIT_MODE: `AS_EDIT_MODE`,
};

export const RouteTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

export const emptyDestination = {place: ``, placeDescription: ``, placePhotos: ``};

export const Destinations = [
  {
    place: `Angkor`,
    placeDescription: `Эта старинная камбоджийская столица, центр кхмерской цивилизации достигла наивысшего расцвета в период между IX и XIII веками. В 1432 году Ангкор захватили сиамцы, и началось его медленное увядание. В течение многих веков здесь сосуществовали буддизм и индуизм`,
    placePhotos: getPhoto(),
  },
  {
    place: `Antwerpen`,
    placeDescription: `Город великих имён. Он находиться в Бельгии. На гербе города изображены две руки, готовые к дружескому рукопожатию, над крепостными стенами.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Jerusalem`,
    placeDescription: `Много раз он был разрушен и много раз строился заново. Здесь Авраам говорил с Богом, здесь Соломон строил Храм, здесь Крестный Путь и Гроб Господень. В невообразимо далёкое время в Иерусалиме уже стоял Первый храм, построенный царём Соломоном. Его отец Давид привёл в Иерусалим евреев в X веке до н.э. Впоследствии им пришлось бесконечно долго воевать и не раз покидать город.`,
    placePhotos: getPhoto(),
  },
  {
    place: `La Paz`,
    placeDescription: `На высоте 3636 метров над уровнем моря расположен город с миллионным населением - самая высокогорная столица мира. Хотя Ла-Пас - столица де-факто. Исполнительная и законодательная власть Боливии, здание парламента, резиденция президента, министерства находятся здесь. Формально столицей республики считается небольшой город Сукре, у которого от всех столичных атрибутов остался лишь Верховный суд.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Lucerne`,
    placeDescription: `Главный город Центральной Швейцарии расположен у Фирвальдштедского озера и окружён горами. Он основан в 1178 году на месте маленькой рыбацкой деревушки. Город пересекает река Рейс, через которую перекинуты мосты - ещё одна достопримечательность Люцерна.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Nairobi`,
    placeDescription: `Для тропической страны здесь хороший климат, недаром Кения привлекла англичан. Они заложили колониальный форт Найроби (название его идёт от небольшой речки и означает "холодная вода") в 1899 году. В начале века сюда из порта Момбасы переехала английская администрация. Найроби становится штаб-квартирой английских банков и фирм, здесь решались судьбы не только Кении, но и других африканских стран.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Nelson`,
    placeDescription: `Самая старинная область в Новой Зеландии и его главный город - Нельсон. У северной оконечности залива Тасман в 1642 году произошла первая встреча европейцев с маори. Одна из лодок, посланных Абелем Тасманом на берег, была атакована маорийскими воинами, в результате чего погибло четыре матроса.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Niamey`,
    placeDescription: `Столицу Нигера Ниамей основали французские колонизаторы в 1892 году, создав в небольшой деревушке свой опорный военный пункт. Благоприятное расположение Ниамея на перекрестке торговых путей способствовало быстрому росту города. Ниамей вытянулся вдоль реки Нигер на 7 километров. По берегу реки, где растительность богаче, чем в центре, живут наиболее состоятельные африканцы, а также французы, в этом районе - дворец президента, важные торговые фирмы, гостиницы.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Nicosia`,
    placeDescription: `Столица Республики Кипр Никосия находится примерно в центре острова на равнине. Город опоясывает река Пидиас, бурная и быстрая зимой, и пересыхающая летом. Никосия возникла на месте древнего кипрского города-государства Ледра и стала столицей Кипра в VII веке, когда прибрежные города острова потеряли своё значение из-за непрерывных набегов иностранных завоевателей.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Ottawa`,
    placeDescription: `Столица Канады - сравнительно молодой город. Название его происходит от алгонкинского слова, обозначающего "обмен". Первыми из белых в районе Оттавы побывали в 1613 году французские представители пушных и меховых компаний. Основателем Оттавы считается Филомен Райт, который появился в долине реки Оттава в 1799 году и создал колонию, положив начало торговле лесом.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Palenque`,
    placeDescription: `Древние майя выбрали для строительства Паленке очень удачное место. Основная его часть расположена на платформе (плато), возвышающейся над окружающей равниной почти на 60 метров, и на склонах окружающих гор. С юга город защищён стеной скалистых горных хребтов, где берут начало многочисленные ручьи с прозрачной водой. В самом центре, где когда-то был "священный квартал" с храмами богов и жилищами царей, и сейчас ещё можно увидеть целое созвездие архитектурных шедевров - святилищ и дворцов.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Paris`,
    placeDescription: `Самое высокое железное сооружение Парижа - Эйфелева башня, украшение Всемирной выставки 1889 года. Поражают её технические данные: более 15 тысяч металлических деталей, соединённых двумя с лишним миллионами заклепок, составляют железное "кружево" в 9 тысяч тонн. Это архитектурное сооружение у многих вызвало неприятие. Теперь это олицетворение Парижа. Она, как магнит, притягивает миллионы людей со всего мира.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Plovdiv`,
    placeDescription: `Как только ни называли Пловдив - Эвмиолпия, Колиба, Полпудева, Филиппополь, Делоплис, Тримонциум, Плудек. Город завоёвывали фракийцы, кельты, римляне, готы, гунны, турки. В 1877 году драгунский капитан российской армии Бураго во главе своего эскадрона переплыл ледяную Марицу и первым вступил в город. На холме над Пловдивом стоит Русский памятник, поставленный в честь погибших офицеров и нижних чинов.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Pretoria`,
    placeDescription: `С 1961 года столицей ЮАР официально считается Претория, которая вместе с тем является и административным центром провинции Трансвааль.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Santo Domingo`,
    placeDescription: `Столица Доминиканской Республики Санто-Доминго - самый древний город в Новом Свете. Он был заложен 4 августа 1496 года на восточном берегу реки Осман братом Христофора Колумба Бартоломео и назван Новая Изабелла. Но сильный ураган разрушил дома, и Николас-де-Ованда перенёс город на другой берег реки.`,
    placePhotos: getPhoto(),
  },
  {
    place: `Sydney`,
    placeDescription: `В заливе Порт-Джексон было заложено первое поселение - нынешний Сидней. В 1980 году, после строительного бума, Сидней стал одной из главных мировых столиц, международным финансовым центром. Это самый старый и самый красивый город на всем австралийском континенте.`,
    placePhotos: getPhoto(),
  },
];

export const OffersList = [
  {
    type: `Taxi`,
    offers: [
      {title: `Add breakfast`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Book tickets`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Improve class`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
    ]
  },
  {
    type: `Bus`,
    offers: [
      {title: `Lunch in city`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5}
    ]
  },
  {
    type: `Train`,
    offers: [
      {title: `Order the guide`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Musical accompaniment`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
    ]
  },
  {
    type: `Ship`,
    offers: [
      {title: `Improve class`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Archery excursion`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Add breakfast`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Add luggage`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
    ]
  },
  {
    type: `Transport`,
    offers: [
      {title: `Book tickets`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Choose seats`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Lunch in city`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
    ]
  },
  {
    type: `Drive`,
    offers: []
  },
  {
    type: `Flight`,
    offers: [
      {title: `Add meal`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Rent a car`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Order the guide`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Add luggage`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Add breakfast`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
    ]
  },
  {
    type: `Check-in`,
    offers: [
      {title: `Rent a car`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Archery excursion`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
    ]
  },
  {
    type: `Sightseeing`,
    offers: [
      {title: `Rent a car`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Improve class`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
    ]
  },
  {
    type: `Restaurant`,
    offers: [
      {title: `Order Uber`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Rent a car`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Travel by train`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Improve class`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
      {title: `Archery excursion`, expense: getRandomInteger(10, 50), isChecked: Math.random() > 0.5},
    ]
  },
];

// AS_NEW_COMPONENT - необходим при генерации нового эвента
// AS_EDIT_MODE - необходим при ренерации списка всех эвентов
