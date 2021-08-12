import React, { Fragment, SVGProps } from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { AcademicCapIcon, AnnotationIcon, ChatAlt2Icon, ChevronDownIcon, CodeIcon, MailIcon, MenuIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/outline';

interface MenuItem {
  name: string;
  description: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

interface FooterItem {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

interface Category {
  main?: boolean;
  name: string;
  href?: string;
  items?: MenuItem[];
  footer?: FooterItem[];
}

type Menu = Category[];

const menu: Menu = [
  {
    name: '엔이',
    href: 'https://playentry.org/community/entrystory/list',
  },
  {
    main: true,
    name: '커뮤니티',
    items: [
      {
        name: '둣토리',
        description: '자유롭게 이야기를 나눌 수 있어요. 물론 선을 넘으면 철퇴니까 눈치 보고 글을 싸질러주세요.',
        href: '/board/free',
        icon: ChatAlt2Icon,
      },
      {
        name: '노하우&팁',
        description: '노하우와 팁을 공유할 수 있어요. 꼭 엔트리 관련 이야기가 아니더라도 괜찮아요.',
        href: '/board/tips',
        icon: AcademicCapIcon,
      },
      {
        name: '묻고답하기',
        description: '질문을 하고, 질문에 대한 대답을 할 수 있어요. 꼭 엔트리 관련 이야기가 아니더라도 괜찮아요.',
        href: '/board/qna',
        icon: QuestionMarkCircleIcon,
      },
    ],
  },
  {
    name: '정보',
    items: [
      {
        name: 'FAQ',
        description: '자주 묻는 질문을 한곳에 모아놨어요.',
        href: '/faq',
        icon: AnnotationIcon,
      },
      {
        name: 'GitHub',
        description: 'dutory의 GitHub 저장소에요.',
        href: 'https://github.com/thoratica/dutory',
        icon: CodeIcon,
      },
    ],
    footer: [
      {
        name: '이메일로 문의하기',
        href: 'mailto:me@tica.fun',
        icon: MailIcon,
      },
    ],
  },
];

const classNames = (...classes: string[]) => classes.join(' ');

const Nav = () => {
  return (
    <Popover className={'relative bg-white'}>
      {({ open }) => (
        <>
          <div className={'max-w-7xl mx-auto px-4 sm:px-6'}>
            <div className={'flex justify-between items-center py-5 md:justify-start md:space-x-10'}>
              <div className={'flex justify-start lg:w-0 lg:flex-1'}>
                <Link href={'/'}>
                  <a>
                    <span className={'sr-only'}>dutory</span>
                    <img className={'h-6 w-auto'} src={'/logo.png'} />
                  </a>
                </Link>
              </div>
              <div className={'-mr-2 -my-2 md:hidden'}>
                <Popover.Button className={'bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none'}>
                  <span className={'sr-only'}>메뉴 열기</span>
                  <MenuIcon className={'h-6 w-6'} aria-hidden={true} />
                </Popover.Button>
              </div>
              <Popover.Group as='nav' className={'hidden md:flex space-x-10'}>
                {menu.map((category) => {
                  if (category.items !== undefined) {
                    return (
                      <Popover key={category.name} className={'relative'}>
                        {({ open }) => (
                          <>
                            <Popover.Button className={classNames(open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none')}>
                              <span>{category.name}</span>
                              <ChevronDownIcon className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')} aria-hidden={true} />
                            </Popover.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              enter={'transition ease-out duration-200'}
                              enterFrom={'opacity-0 translate-y-1'}
                              enterTo={'opacity-100 translate-y-0'}
                              leave={'transition ease-in duration-150'}
                              leaveFrom={'opacity-100 translate-y-0'}
                              leaveTo={'opacity-0 translate-y-1'}
                            >
                              <Popover.Panel static className={'absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'}>
                                <div className={'rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'}>
                                  <div className={'relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'}>
                                    {category.items!.map((item) => (
                                      <Link key={item.name} href={item.href}>
                                        <a className={'-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'}>
                                          <item.icon className={'flex-shrink-0 h-6 w-6 text-green-400'} aria-hidden={true} />
                                          <div className={'ml-4'}>
                                            <p className={'text-base font-medium text-gray-900'}>{item.name}</p>
                                            <p className={'mt-1 text-sm text-gray-500'}>{item.description}</p>
                                          </div>
                                        </a>
                                      </Link>
                                    ))}
                                  </div>
                                  {category.footer !== undefined && (
                                    <div className={'px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8'}>
                                      {category.footer!.map((item) => (
                                        <div key={item.name} className={'flow-root'}>
                                          <Link href={item.href}>
                                            <a className={'-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100'}>
                                              <item.icon className={'flex-shrink-0 h-6 w-6 text-gray-400'} aria-hidden={true} />
                                              <span className={'ml-3'}>{item.name}</span>
                                            </a>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    );
                  } else {
                    return (
                      <Link key={category.name} href={category.href ?? '#'}>
                        <a className={'text-base font-medium text-gray-500 hover:text-gray-900'}>{category.name}</a>
                      </Link>
                    );
                  }
                })}
              </Popover.Group>
              <div className={'hidden md:flex items-center justify-end md:flex-1 lg:w-0'}>
                <Link href={'/login'}>
                  <a className={'whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'}>로그인</a>
                </Link>
                <Link href={'/join'}>
                  <a className={'ml-8 whitespace-nowrap inline-flex items-center justify-center px-6 py-1.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-400 hover:bg-green-500'}>가입</a>
                </Link>
              </div>
            </div>
          </div>

          <Transition show={open} as={Fragment} enter={'duration-200 ease-out'} enterFrom={'opacity-0 scale-95'} enterTo={'opacity-100 scale-100'} leave={'duration-100 ease-in'} leaveFrom={'opacity-100 scale-100'} leaveTo={'opacity-0 scale-95'}>
            <Popover.Panel focus static className={'absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'}>
              <div className={'rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'}>
                <div className={'pt-5 pb-6 px-5'}>
                  <div className={'flex items-center justify-between'}>
                    <Link href={'/'}>
                      <a>
                        <span className={'sr-only'}>dutory</span>
                        <img className={'h-6 w-auto'} src={'/logo.png'} />
                      </a>
                    </Link>
                    <div className={'-mr-2'}>
                      <Popover.Button className={'bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none'}>
                        <span className={'sr-only'}>메뉴 닫기</span>
                        <XIcon className={'h-6 w-6'} aria-hidden={true} />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className={'mt-6'}>
                    <nav className={'grid gap-y-8'}>
                      {menu.find((category) => category.main) !== undefined &&
                        (() => {
                          const category = menu.find((category) => category.main)!;

                          if (category.items === undefined) return <></>;

                          return category.items.map((item) => (
                            <Link key={item.name} href={item.href}>
                              <a className={'-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'}>
                                <item.icon className={'flex-shrink-0 h-6 w-6 text-green-400'} aria-hidden={true} />
                                <span className={'ml-3 text-base font-medium text-gray-900'}>{item.name}</span>
                              </a>
                            </Link>
                          ));
                        })()}
                    </nav>
                  </div>
                </div>
                <div className={'py-6 px-5 space-y-6'}>
                  <div className={'grid grid-cols-2 gap-y-4 gap-x-8'}>
                    {menu
                      .filter((category) => !category.main)
                      .map((category) => {
                        if (category.items !== undefined) {
                          return category.items.map((item) => (
                            <Link href={item.href}>
                              <a key={item.name} className={'text-base font-medium text-gray-900 hover:text-gray-700'}>
                                {item.name}
                              </a>
                            </Link>
                          ));
                        } else {
                          return (
                            <Link href={category.href ?? '#'}>
                              <a key={category.name} className={'text-base font-medium text-gray-900 hover:text-gray-700'}>
                                {category.name}
                              </a>
                            </Link>
                          );
                        }
                      })}
                  </div>
                  <div>
                    <Link href='/join'>
                      <a className={'w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-400 hover:bg-green-500'}>가입</a>
                    </Link>
                    <p className={'mt-3 text-center text-base font-medium text-gray-500'}>
                      이미 회원이신가요?{' '}
                      <Link href='/login'>
                        <a href='#' className={'text-green-400 hover:text-green-500'}>
                          로그인
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Nav;
