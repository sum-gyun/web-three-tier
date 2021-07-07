import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2'
import * as iam from '@aws-cdk/aws-iam'
import { Instance, SecurityGroup, SubnetType } from '@aws-cdk/aws-ec2';

export class WebThreeTierStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "dev", {
      cidr: '10.207.23.0/24',
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 27,
          name: 'pub',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 27,
          name: 'pri',
          subnetType: ec2.SubnetType.PRIVATE,
        },
        {
          cidrMask: 27,
          name: 'rds',
          subnetType: ec2.SubnetType.ISOLATED,
        }
      ],
    })

    // this is a unique id that will represent this resource in a Cloudformation template
    const role = new iam.Role(this,  'EC2-instanace-role', {
        assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
      }
    )

    // lets create a security group for our instance
    // A security group acts as a virtual firewall for your instance to control inbound and outbound traffic.
    const securityGroup = new ec2.SecurityGroup(this, 'infra-secruity-sg', {
        vpc: vpc,
        allowAllOutbound: true, // will let your instance send outboud traffic
        securityGroupName: 'infra-secruity-sg',
      }
    )

     // lets use the security group to allow inbound traffic on specific ports
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allows SSH access from Internet'
    )

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allows HTTP access from Internet'
    )

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allows HTTPS access from Internet'
    )

    const instance = new ec2.Instance(this, 'network-bastion', {
      vpc: vpc,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
      role: role,
      securityGroup: securityGroup,
      instanceName: 'network-bastion',
      instanceType: ec2.InstanceType.of( // t2.micro has free tier usage in aws
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'infra', // we will create this in the console before we deploy
    })

    // cdk lets us output prperties of the resources we create after they are created
    // we want the ip address of this new instance so we can ssh into it later
    new cdk.CfnOutput(this, 'network-bastion-output', {
      value: instance.instancePublicIp
  })
  }
}
