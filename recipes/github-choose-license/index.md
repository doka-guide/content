---
title: "Как выбирать лицензию на GitHub"
description: "Организуйте работу в пулреквестах на GitHub."
authors:
  - igsekor
related:
  - tools/version-control
  - tools/git-cli
  - tools/github-actions
tags:
  - article
---

## Задача

Выбрать лицензию для репозитория на GitHub.

## Решение

На GitHub есть возможность указать лицензию для репозитория. Добавить типовую лицензию можно на этапе создания репозитория, как это описано в рецепте «[Как создать репозиторий](https://doka.guide/recipes/github-new-repo/)». Для этого необходимо выбрать лицензию из списка.

Если необходимо добавить собственную не типовую лицензию или нужно добавить лицензию уже после этапа создания репозитория, нужно сделать следующее:

1. Перейти на первую вкладку репозитория.
2. Кликнуть «Add file» и выбрать пункт «Create new file»

![](images/create-file.png)

1. На открывшейся странице нужно ввести имя файла _LICENSE.md_. После этого появится кнопка «Choose a license template». На этом этапе вы можете выбрать одну из типовых лицензий или написать собственную.

![](images/choose-license.png)

1. После нажатия на кнопку «Choose a license template» вас спросят, уверены ли вы, что хотите покинуть страницу. Подтвердите своё согласие с этим. В открывшемся окне слева можно выбрать одну из типовых лицензий GitHub. В верхнем блоке есть подсказка по авторскому праву, которое защищает выбранная вами лицензия. После того, как вы убедились в корректности вашего выбора, нажмите кнопку «Review and submit».

![](images/license-templates.png)

1. Вам снова откроется окно из пункта 3. Вы можете отредактировать типовую лицензию или просто оставить всё как есть. Если вы уверены, нажмите кнопку «Commit changes…». Во всплывающем окне выберите комментарий к коммиту (и описание, если нужно) и нажмите кнопку «Commit changes».

![](images/commit-changes.png)

После этого в репозитории добавится новый файл с лицензией, и на основной  странице репозитория справа появится выбранная лицензия.

![](images/new-license-in-repo.png)

## Разбор решения

Лицензия позволит защитить авторские права и опишет условия использования репозитория другими людьми или компаниями. Схема выбора типа лицензии:

![](images/license-types.png)

Схема выбора открытой лицензии из числа самых распространённых:

![](images/open-license-choice.png)

Поскольку GitHub, в основном, используется для хранения кода программного обеспечения, список типовых лицензий состоит из следующих:

- [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0);
- [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html);
- [MIT License](https://opensource.org/license/mit/);
- [BSD 2-Clause "Simplified" License](https://opensource.org/license/bsd-2-clause/);
- [BSD 3-Clause "New" or "Revised" License](https://opensource.org/license/bsd-3-clause/);
- [Boost Software License 1.0](https://www.boost.org/users/license.html);
- [Creative Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/);
- [Eclipse Public License 2.0](https://www.eclipse.org/legal/epl-2.0/);
- [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html);
- [GNU General Public License v2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html);
- [GNU Lesser General Public License v2.1](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html);
- [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/);
- The Unlicense — лицензия, которая свидетельствует об отказе от авторских прав.
