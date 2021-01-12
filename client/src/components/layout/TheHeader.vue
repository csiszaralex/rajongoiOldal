<template>
  <div>
    <ul class="nav nav-tabs navbar-light" id="navId">
      <span class="navbar-brand ml-2 strong">&lt;3</span>
      <li class="nav-item">
        <router-link to="/" id="kezdolap" class="nav-link lead">Kezdőlap</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/bongeszes" id="bongeszes" class="nav-link lead">Böngészés</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/keszitok" id="keszitok" class="nav-link lead">Készítők</router-link>
      </li>
    </ul>
  </div>
</template>
