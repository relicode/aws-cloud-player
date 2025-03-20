#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { StaticSite } from './constructs/static-site'
import * as constants from './constants'

class MyStaticSiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props)

    new StaticSite(this, 'StaticSite', {
      domainName: constants.DOMAIN_MAIN,
      siteSubDomain: constants.DOMAIN_SUB,
    })
  }
}

const app = new cdk.App()

new MyStaticSiteStack(app, 'MapifestCV', {
  /**
   * This is required for our use of hosted-zone lookup.
   *
   * Lookups do not work at all without an explicit environment
   * specified; to use them, you must specify env.
   * @see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
   */
  env: constants.ENV,
})

app.synth()
