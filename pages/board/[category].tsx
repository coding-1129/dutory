import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, SearchIcon, ShareIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/dist/client/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';

const posts = [
  {
    id: 120021,
    title:
      '샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석샌즈학에 관한 분석',
    author: 'githubgodreal',
    date: Date.now(),
  },
];

const classNames = (...classes: string[]) => classes.join(' ');

const Board = () => {
  const router = useRouter();
  const { category } = router.query;
  const ref = useRef<HTMLTableHeaderCellElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current?.querySelector('[data-title]')!.clientWidth ?? 0);

    window.addEventListener('resize', () => setWidth(ref.current?.querySelector('[data-title]')!.clientWidth ?? 0));
    return () => window.addEventListener('resize', () => setWidth(ref.current?.querySelector('[data-title]')!.clientWidth ?? 0));
  });

  return (
    <>
      <div className={'lg:flex lg:items-center lg:justify-between'}>
        <h2 className={'text-2xl font-semibold leading-7 text-gray-900 sm:text-3xl sm:truncate'}>{category}</h2>
        <div className={'mt-5 flex lg:mt-0 lg:ml-4'}>
          <span className={'hidden sm:block'}>
            <button type='button' className={'inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'}>
              <SearchIcon className={'-ml-1 mr-2 h-5 w-5 text-gray-500'} aria-hidden={true} />
              검색
            </button>
          </span>

          <span className={'hidden sm:block ml-3'}>
            <button type='button' className={'inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'}>
              <ShareIcon className={'-ml-1 mr-2 h-5 w-5 text-gray-500'} aria-hidden={true} />
              공유
            </button>
          </span>

          <span className={'sm:ml-3'}>
            <button type='button' className={'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none'}>
              <PlusIcon className={'-ml-1 mr-2 h-5 w-5'} aria-hidden={true} />새 글
            </button>
          </span>

          <Menu as='span' className={'ml-3 relative sm:hidden'}>
            <Menu.Button className={'inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'}>
              더보기
              <ChevronDownIcon className={'-mr-1 ml-2 h-5 w-5 text-gray-500'} aria-hidden={true} />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter={'transition ease-out duration-200'}
              enterFrom={'transform opacity-0 scale-95'}
              enterTo={'transform opacity-100 scale-100'}
              leave={'transition ease-in duration-75'}
              leaveFrom={'transform opacity-100 scale-100'}
              leaveTo={'transform opacity-0 scale-95'}
            >
              <Menu.Items className={'origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'}>
                <Menu.Item>
                  {({ active }) => (
                    <a href='#' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      검색
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a href='#' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      공유
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div ref={ref} className={'flex flex-col mt-4'}>
        <div className={'shadow rounded-lg hidden sm:block'}>
          <div className={'bg-gray-50 rounded-lg flex'}>
            <div className={'px-3 py-3 text-left text-xs font-medium text-gray-500'} style={{ width }}>
              제목
            </div>
            <div className={'px-3 py-3 w-32 flex-shrink-0 flex-grow-0 whitespace-nowrap text-left text-xs font-medium text-gray-500'}>작성자</div>
            <div className={'px-3 py-3 w-20 flex-shrink-0 flex-grow-0 whitespace-nowrap text-left text-xs font-medium text-gray-500'}>날짜</div>
          </div>
          <div className={'bg-white rounded-lg flex'}>
            {posts.map((post) => (
              <Fragment key={post.id}>
                <div className={'px-3 py-4 w-max whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-gray-900'} data-title>
                  {post.title}
                </div>
                <div className={'px-3 py-4 w-32 flex-shrink-0 flex-grow-0 whitespace-nowrap text-sm text-gray-900'}>{post.author}</div>
                <div className={'px-3 py-4 w-20 flex-shrink-0 flex-grow-0 whitespace-nowrap text-sm text-gray-900'}>
                  {(() => {
                    const date = new Date(post.date);

                    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                  })()}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className={'shadow rounded-lg block sm:hidden'}>
          <div className={'bg-white rounded-lg flex flex-col'}>
            {posts.map((post) => (
              <div key={post.id} className={'px-3 py-3'}>
                <div className={'w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-md font-medium text-gray-900'}>{post.title}</div>
                <div className={'flex flex-row gap-1'}>
                  <div className={'text-xs text-gray-500 ml-px'}>{post.author}</div>
                  <div className={'text-xs font-bold text-gray-300'}>|</div>
                  <div className={'text-xs text-gray-500'}>
                    {(() => {
                      const date = new Date(post.date);

                      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
